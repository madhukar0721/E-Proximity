import './AdminDashBoard.css';
import Sidebar from '../Student/Sidebar';
import Header from '../Student/Header';
import Sticky from 'react-stickynode';
import Card from './Crad';
import 
{ BsGrid1X2Fill,BsFillGrid3X3GapFill,
  BsListCheck}
 from 'react-icons/bs'

function AdminDashBoard(){
    return(
      <div className='grid-container'>
        <Header/>
        <Sticky><Sidebar/></Sticky>
        <div className='adminMain'>
             <div className='UpperPartAdmin'>
                <h3 style={{color:"grey"}}> <BsGrid1X2Fill className='icon' style={{fontSize:"1.5rem"}}/>&nbsp;&nbsp;Admin Dashboard</h3>
             </div>
                <div className='CradSection'>
                <a href="#"><Card name="Add New User"/></a>
                <a href="/CreateTimetable"><Card name="Add Timetable"/></a>
                </div>            
        </div>
      </div>
    );
}
export default AdminDashBoard;