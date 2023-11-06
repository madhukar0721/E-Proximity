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
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outer>
        <Navigation></Navigation>
        <Slider></Slider>
       <Noticeboard></Noticeboard>
       <About></About>
       <PortalStrength></PortalStrength>
       <Footer></Footer>
       </Outer>  
    </>
  )
}

export default App
