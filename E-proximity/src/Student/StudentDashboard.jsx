import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './All.css'
import './StudentDashboard.css';
import Sticky from 'react-stickynode';

function SidebarDashboard(){
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
  setOpenSidebarToggle(!openSidebarToggle)
  }
  return(
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sticky><Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} className="scroll"/></Sticky>
      <div className='para'>
       <h3>Student Dashboard</h3>
      <div className='pending-tasks'><h6>Pending Tasks</h6><p>0 Pending Tasks For Submission</p></div>
      <div className='three-cards'>
        <div className='notice'>NOTICE</div>
        <div className='feepayment'>FEE PAYMENT</div>
        <div className='attendence'>ATTENDENCE</div>
      </div>
      <div className='time-table'>
        <div className='heading'><h6>Time-Table</h6></div>
        <div className='schedule-lecture'><h6>Today's Lectures</h6></div>
        <div className='lecutre-table'>
          <table>
            <tr>
              <th>Monday</th>
              <th>November 26,2023</th>
            </tr>
            <tr>
              <td>9:00 AM</td>
              <td>Computer Architecture</td>
            </tr>
            <tr>
              <td>10:00 AM</td>
              <td>Applied Mathematics</td>
            </tr>
            <tr>
              <td>11:00 AM</td>
              <td>Computer Graphics</td>
            </tr>
            <tr>
             <td>12:00 PM</td>
             <td>Design Analysis and Algorithm</td>
            </tr>
            <tr>
              <td>2:00 PM</td>
              <td>Machine Learning </td>
            </tr>
            <tr>
              <td>3:00 PM</td>
              <td>Data Strucutres</td>
            </tr>
            
        </table>
        </div>
      </div>
      </div>
    </div>
   
  );
};
export default SidebarDashboard;