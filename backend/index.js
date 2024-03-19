import express from 'express';
import mongoose from 'mongoose';
import userroutes from './routes/users.js';
const app = express();
app.use(express.json());
const connect=()=>{
  mongoose.connect('mongodb+srv://devashish:1234@cluster0.il2ouwq.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});
  console.log('mongodb connected');
}


app.use('/api/v1/users',userroutes)
app.listen(8000, () => {
  connect()
  console.log('Server is running on port 3000');
})