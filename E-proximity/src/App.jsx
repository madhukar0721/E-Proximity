import { useState } from 'react';
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
import Login from './Login/Login'

function App() {
  const [count, setCount] = useState(0)
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
       <Route exact path ="/student-auth" element={<><Login name='Student'/> </>} />
       <Route exact path ="/faculty-auth" element={<><Login name="Faculty"/> </>} />
       <Route exact path ="/admin-auth" element={<><Login name="Admin"/> </>} />
      </Routes>
    </BrowserRouter></>
  )
}

export default App
