import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Outer from './Home/Container'
import Noticeboard from './Home/Noticeboard';
import About from './Home/About';
import PortalStrength from './Home/PortalStrength';
import Footer from './Home/Footer';
import Slider from './Home/Slider';
import Navigation from './Home/Navigation';
import { BrowserRouter,  Routes, Route  } from 'react-router-dom';
import Login from './Login/login';
import Faculty from './Faculty/FacultyDashBoard'
import Student from './student2/StudentDashBoard'
import Apps from './admin-backend/apps';
import Register from './admin-backend/register';

function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for a stored token on component mount
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    // Set the token in the state and store it in localStorage
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    // Clear the token from the state and localStorage
    setToken(null);
    localStorage.removeItem('token');
  };
  return (
    <>  <BrowserRouter>
    <Routes>
      <Route exact path ="/" element={<>  <Outer>
        <Navigation></Navigation>
        <Slider></Slider>
       <Noticeboard></Noticeboard>
       <About></About>
       <PortalStrength></PortalStrength>
       <Footer></Footer>
       </Outer> </>} />
       <Route exact path ="studnet-auth" element={<>    <div>
      {token ? (
        <Student token={token} onLogout={handleLogout} />
      ) : (
        <div>
          <Login setToken={handleLogin}  />
        </div>
      )}
    </div></>} />
       <Route exact path ="/faculty-auth" element={<> </>} />
       <Route exact path ="/admin-auth" element={<> </>} />
       <Route exact path ="/faculty" element={<><Faculty /> </>} />
       <Route exact path ="/student" element={<><Student /> </>} />
       <Route exact path ="/regiter" element={<><Apps /> </>} />
       <Route exact path ="/register" element={<><Register /> </>} />

       
      </Routes>
    </BrowserRouter></>
  )
}

export default App
