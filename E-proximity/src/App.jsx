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
import FeeDetail from './Student/FeeDetails';
// import Login from './Login/Login';
import Faculty from './Faculty/FacultyDashBoard';
// import Student from '../src/Student/StudentDashboard';
import Assignment from './Student/Assignment';
import Logout from '../src/Login/Login';
import StudentProfile from './Student/StudentProfile';
import CreateTimeTable1 from './admin-backend/CreateTimeTable1';
import ViewTimeTable from './admin-backend/ViewTimetable';
import Admindashboard from './admin-backend/AdminDashBoard';
import CreateTimetable from './admin-backend/CreateTimeTable1';
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
    <><BrowserRouter>
    <Routes>
      <Route exact path ="/" element={<><Outer>
        <Navigation></Navigation>
        <Slider></Slider>
       <Noticeboard></Noticeboard>
       <About></About>
       <PortalStrength></PortalStrength>
       <Footer></Footer>
       </Outer> </>} />
       {/* <Route exact path ="/student-auth" element={<><Apps name='Student'/> </>} /> */}
       {/* <Route exact path ="/faculty-auth" element={<><Login name="Faculty"/> </>} /> */}
       {/* <Route exact path ="/admin-auth" element={<><Login name="Admin"/> </>} /> */}
       <Route exact path='/faculty' element={<><Faculty/></>}/>
       {/* <Route exact path="/studentdash" element={<><Student/></>}/> */}
       <Route exact path='/feedetails' element={<><FeeDetail/></>}/>
       <Route exact path='/assignment' element={<><Assignment/></>}/>
       <Route exact path='/logout' element={<><Logout/></>}/>
       <Route exact path='/studentprofile' element={<><StudentProfile/></>}/>
       <Route exact path='/createtimetable' element={<><CreateTimeTable1/></>}/>
       <Route exact path='/viewtimetable' element={<><ViewTimeTable/></>}/>
       <Route exact path='/admindashboard' element={<><Admindashboard/></>}/>
       <Route exact path='/createtimetable' element={<><CreateTimetable/></>}/>
      </Routes>
    </BrowserRouter></>
  );
};

export default App;
