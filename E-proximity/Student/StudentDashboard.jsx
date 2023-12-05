import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './All.css'
import './StudentDashboard.css';
import Sticky from 'react-stickynode';
import Datepicker from './Datepicker';

function SidebarDashboard(){
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
  setOpenSidebarToggle(!openSidebarToggle)
  }
  return(
    <>
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
      <div className='DatePicker'>
      <div><Datepicker className="datepicker"/></div>
      </div>
      <div className='time-table'>
        <div className='heading'>
          <h6>Time-Table</h6>
        </div>
        <div className='schedule-lecture'><h6>Today's Lectures</h6></div>
        <div className='lecture-table'>
        <table>
            <thead>
              <tr>
                <th scope="col">Monday</th>
                <th scope="col">04 Dec ,2023</th>
                <th scope="col">Lecturer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:00 AM</td>
                <td>DAA</td>
                <td>Srinath Sir</td>
              </tr>
              <tr>
                <td>10:00 AM</td>
                <td>DAA</td>
                <td>Srinath Sir</td>
              </tr>
              <tr>
                <td>10:00 AM</td>
                <td>DAA</td>
                <td>Srinath Sir</td>
              </tr>
              <tr>
                 <td>10:00 AM</td>
                <td>DAA</td>
                <td>Srinath Sir</td>
              </tr>
              <tr>
                <td>10:00 AM</td>
                <td>DAA</td>
                <td>Srinath Sir</td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
      </div>
    </div>
   </>
  );
};
export default SidebarDashboard;