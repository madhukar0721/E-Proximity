import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Outer from './component/Container'
import Noticeboard from './component/Noticeboard';
import About from './component/About';
import PortalStrength from './component/PortalStrength';
import Footer from './component/Footer';
import Slider from './component/Slider';
import Navigation from './component/Navigation';
import { BrowserRouter,  Routes, Route  } from 'react-router-dom';
import Login from './component/Login'
import Facultylogin from './component/Facultylogin'
import Dashboard from '../Student/Dashboard';

function App() {
  const [count, setCount] = useState(0)
  return (
    // <>
    //   <Outer>
    //   <Navigation></Navigation>
    //   <Slider></Slider>
    //  <Noticeboard></Noticeboard>
    //  <About></About>
    //  <PortalStrength></PortalStrength>
    //  <Footer></Footer>
    //  </Outer>  
    // </>
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
       <Route exact path ="/student-auth" element={<><Login name='Student'/> </>} />
       <Route exact path ="/faculty-auth" element={<><Login name="Faculty"/> </>} />
       <Route exact path ="/admin-auth" element={<><Login name="Admin"/> </>} />
       <Route exact path ="/student_dashboard" element={<><Dashboard/> </>} />


    </Routes>
    </BrowserRouter></>
  )
}

export default App
