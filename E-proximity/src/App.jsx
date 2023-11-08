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
import Studentlogin from './component/Studentlogin';
import Facultylogin from './component/Facultylogin';
import Adminlogin from './component/Adminlogin';

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
       <Route exact path ="/student-auth" element={<><Studentlogin/> </>} />
       <Route exact path ="/faculty-auth" element={<><Facultylogin/> </>} />
       <Route exact path ="/admin-auth" element={<><Adminlogin/> </>} />
    </Routes>
    </BrowserRouter></>
  )
}

export default App
