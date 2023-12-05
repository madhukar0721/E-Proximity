from flask import Flask,request,jsonify 
from datetime import date,datetime,timedelta
from apscheduler.schedulers.background import BackgroundScheduler
import pymongo
from email.mime.text import MIMEText
import smtplib
from email.mime.multipart import MIMEMultipart
from pprint import pprint
from flask import Flask, request, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
import smtplib
import threading
from email.mime.text import MIMEText
# processping...
import random
app = Flask(__name__)


# Scheduler..
sched = BackgroundScheduler(daemon=True)
sched.start()
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

client = pymongo.MongoClient("")
db = client[""]
# ---------------------Queue to store email objects-----------------------------------#
email_queue = []

collection = db['']

def convert_timestamp_to_datetime(timestamp):
    return datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S UTC')


def fetch_and_enqueue_data(email_queue):
    
    threshold_time = int((datetime.utcnow() - timedelta(minutes=10)).timestamp())
    print("--------->",convert_timestamp_to_datetime(threshold_time))
    recent_documents = collection.find({'time': {'$gte': threshold_time}})
    for data in recent_documents:
        email = data.get('email')
        cc = data.get("cc", "")
        bcc = data.get("bcc", "")
        data_type = data.get('type')
        if email and data_type=="invitation":
            email_queue.append({
            "to": data["email"],
            "cc": cc,
            "bcc": bcc,
            "subject":'invitation_code' ,
            "body":"Thank you for your interest. Please use the following invitation code to join us:",
            "invitation_code": data["invite_code"]
        })

        if email and data_type=="forgot password":
            email_queue.append({
            "to": data["email"],
            "cc": cc,
            "bcc": bcc,
            "subject":'forgot password' ,
            "body": "We received a request to reset your password. To proceed, please use the following verification code:",
            "invitation_code": data["invite_code"]
        })

# fetch_and_enqueue_data(email_queue)

#-------------------------------------Template-----------------------------------------#
email_template = """
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }}
        .message {{ margin-bottom: 20px; }}
        .invitation-code-container {{ background-color: #fff; padding: 15px; border-radius: 8px; }}
        .invitation-code {{ font-weight: bold; color: #333; font-size: 18px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="message">
            <p>{}</p>
        </div>
        <div class="invitation-code-container">
            <p class="invitation-code">Invitation Code: {}</p>
        </div>
    </div>
</body>
</html>
"""
# email_template = """
# <html>
# <head>
#     <style>
#         body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }}
#         .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }}
#         .logo-container {{ text-align: left; }}
#         .logo-img {{ max-width: 100px; height: auto; }}
#         .message {{ margin-bottom: 20px; }}
#         .invitation-code-container {{ background-color: #fff; padding: 15px; border-radius: 8px; }}
#         .invitation-code {{ font-weight: bold; color: #333; font-size: 18px; }}
#     </style>
# </head>
# <body>
#     <div class="container">
#         <!-- Logo Section -->
#         <div class="logo-container">
#             <img src="mail_Server\Emsec.png" alt="Company Logo" class="logo-img">
#         </div>

#         <!-- Message Section -->
#         <div class="message">
#             <p>{}</p>
#         </div>

#         <!-- Invitation Code Section -->
#         <div class="invitation-code-container">
#             <p class="invitation-code">Invitation Code: {}</p>
#         </div>
#     </div>
# </body>
# </html>
# """

#-------------------------------------Function to send email-----------------------------------------#

def send_email(email_obj):
    smtp_server = "smtp.gmail.com" 
    smtp_port = 587
    
    smtp_username = ''
    smtp_password = "c"

    # Create MIMEText object
    msg = MIMEText(email_template.format(email_obj["body"],email_obj["invitation_code"]), 'html')
    msg['Subject'] = email_obj["subject"]
    msg['From'] = smtp_username
    msg['To'] = email_obj["to"]
    msg['Cc'] = email_obj["cc"]
    msg['Bcc'] = email_obj["bcc"]

    
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        if email_obj["to"] and smtp_username:
            server.sendmail(smtp_username, [email_obj["to"], email_obj["cc"], email_obj["bcc"]], msg.as_string())

# -----------------Function to check and send emails from the queue------------------------#
def check_and_send_emails():
    while email_queue:
        email_obj = email_queue.pop(0)
        if email_obj:
            print(email_obj)
            send_email(email_obj)

#------------------------------------------scheduler----------------------------------------#
scheduler = BackgroundScheduler()
scheduler.add_job(check_and_send_emails, 'interval', seconds=2)
scheduler.start()

# scheduler.add_job(check_and_send_emails, 'interval', seconds=3)
# thread = threading.Thread(target=scheduler.start)
# thread.start()
#-------------------- API endpoint to add email to the queue-------------------------------#
server_flag = True
@app.route('/sendInviteMail', methods=['POST'])
def send_invite():
    global server_flag
    if server_flag:
        data = request.get_json()

        if not data["email"] and not data["invite_code"]:
            return jsonify({"error": "Both email and invitation code are empty"}), 404

        cc = data.get("cc", "")
        bcc = data.get("bcc", "")

        email_queue.append({
            "to": data["email"],
            "cc": cc,
            "bcc": bcc,
            "subject":'invitation_code' ,
            "body":"Thank you for your interest. Please use the following invitation code to join us:",
            "invitation_code": data["invite_code"]
        })

        return jsonify({"message": "Email added to the queue"}), 200
    else:
        return jsonify({"message": "Account locked. Too many incorrect attempts. Please try again later."}), 423

@app.route('/forgotPasswordMail', methods=['POST'])
def send_forgotPasswordMail():
    global server_flag
    if server_flag:
        data = request.get_json()

        if not data["email"] and not data["invite_code"]:
            return jsonify({"error": "Both email and invitation code are empty"}), 404

        cc = data.get("cc", "")
        bcc = data.get("bcc", "")

        email_queue.append({
            "to": data["email"],
            "cc": cc,
            "bcc": bcc,
            "subject":'invitation_code' ,
            "body": "We received a request to reset your password. To proceed, please use the following verification code:",
            "invitation_code": data["invite_code"]
        })

        return jsonify({"message": "Email added to the queue"}), 200
    else:
        return jsonify({"message": "Account locked. Too many incorrect attempts. Please try again later."}), 423

@app.route('/locked_server', methods=['POST'])
def lock_server():
    global server_flag
    server_flag = False
    return jsonify({"message": "Server locked"}), 200

if __name__ == '__main__':
    app.run(port=5000,debug=True)
