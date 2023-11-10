import './Login.css'
import aithlogo from '../Images/aithlogo.png';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {MDBIcon} from 'mdb-react-ui-kit';
import bg from '../Images/bg.jpg';
import { useState } from 'react';
function Login(props){
  const[userid,setuserid]=useState("");
  const[password,setpassword]=useState("");
  const handleSubmit=(e)=>{
    e.preventDefault();
    alert(email+password);
  };
    return<>
    <nav className="logout">
      <a href='/' className='lg text-reset'>
       Go To Dashboard &nbsp;
      <MDBIcon fas icon="arrow-circle-right" />
          </a>
      </nav>
      <div className='container'>
        <img src={aithlogo} alt='logo'/>
        <h4>{props.name} Login</h4>
        <form onSubmit={(e)=>e.handleSubmit(e)}>
          <div className='InputContainer'>
             <p>User Id</p>
             <input value={userid}
             onChange={(e)=>setuserid(e.target.value)}
             type='text'/>
          </div>
          <div className='InputContainer'>
            <p>Password</p>
            <input value={password}
            onChange={(e)=>setpassword(e.target.value)}
            type='password'/>
          </div>
          <div className='Bottomform'>
            <button type='submit'>Login</button>
            <div className='Links'>
              <p>New Users?</p>
              <p>Forgot Password?</p>
            </div>
          </div>
        </form>
        <small className='copyright'> &copy; 2023 E-Proximity Reserved</small>
        </div>
      </>
}
export default Login;