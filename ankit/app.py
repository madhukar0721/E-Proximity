from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
import secrets,json
with open('config.json','r') as f:
    params = json.load(f)['params']

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Configure Flask Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 26
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = params['gmail-user']
app.config['MAIL_PASSWORD'] = params['gmail-password']
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@example.com'

mail = Mail(app)

# In-memory database (replace with a real database in a production environment)
users = []

def generate_confirmation_token():
    return secrets.token_urlsafe(32)

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']

        # Check if the email is not already registered
        if any(user['email'] == email for user in users):
            flash('Email already registered. Please log in.')
            return redirect(url_for('login'))

        # Generate a unique confirmation token
        token = generate_confirmation_token()

        # Save the user in the "database"
        users.append({'email': email, 'token': token, 'confirmed': False})

        # Send confirmation email
        send_confirmation_email(email, token)

        flash('Registration successful. Confirmation email sent.')
        return redirect(url_for('login'))

    return render_template('register.html')

def send_confirmation_email(email, token):
    subject = 'Confirm Your Registration'
    confirmation_url = url_for('confirm', token=token, _external=True)
    body = f'Click the following link to confirm your registration: {confirmation_url}'

    msg = Message(subject, recipients=[email], body=body)

    mail.send(msg)

@app.route('/confirm/<token>')
def confirm(token):
    # Find the user in the "database" based on the token
    user = next((user for user in users if user['token'] == token), None)

    if user:
        # Mark the user as confirmed
        user['confirmed'] = True
        return render_template('confirmation_success.html')
    else:
        # Handle invalid or expired token
        return render_template('confirmation_failure.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
