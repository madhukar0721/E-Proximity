const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });


const express = require("express");
const bodyParser = require("body-parser");


const role=require('./router/role')
const authRoutes = require('./router/authRoutes');
const adminRoutes = require('./router/adminRoutes');
const DB = require('./DB/conn')
const { verifyAndRefreshToken } = require('./middleware/authMiddleware');


const PORT=process.env.PORT || 5000;

console.log(process.env.PORT);


const app = express()
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    const status = {
        code: 200,
        msg: 'Server Up' 
    }
    res.status(200).send(JSON.stringify(status));
 });

 app.use('/auth',authRoutes);
 app.use('/admin',adminRoutes);



 app.get('/ping', (req, res) => {
    res.status(200).send('PONG');
 })


 app.listen(PORT, () => console.log(`Server started on port ${PORT}`));