import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import img from '../Images/student.png';
import './studentDashBoard.css';
import timetable from './TIMETABLE.json'
function Sidebar(){
  const d=new Date();
  const t=d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
  return(
    <div style={{display:'flex', height: '100vh', overflow: 'scroll initial' }}>
      {/* ----------------SideBar----------------*/}
      <div className='sideBarContainer'>
      <CDBSidebar textColor="#fff" backgroundColor="#492BA0">

        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
             E-Proximity
          </a>
        </CDBSidebarHeader>
        
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
          
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Project</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Assignment</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Logout</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      </div>

      <div className='FacultyRightSection'>
        {/* ------------UpperMenu--------------- */}
          <div className='menu'>
              <div className='DashBoardprofile'>
                <div className='DashBoardProfileImageOuter'>
                      <img src={img} className='DashBoardProfileImage'/>
                </div>
              </div>
          </div>

          {/* ----------------DashBoardContent Part------------------ */}
          <div className='FacultyDashBoardContent'>
               <h3>Today's Schedule</h3>
               <div className='ScheduleChartOuter'> 
      {timetable.days.map((day, index) => (
        <div key={index}>
          <table>
            <thead>
              <tr className=' my-3'>
                <th>Time</th>
                <th>Subject</th>
                <th>Faculty</th>
                <th>Attendence</th>
              </tr>
            </thead>
            <tbody>
              {day.schedule.map((entry, entryIndex) => (
                <tr key={entryIndex} style={{backgroundColor:`${(t>entry.time && t<entry.end)?"green":" white" }`}} >
                  <td style={{color:`${(t>entry.time && t<entry.end)?"white":" rgb(66, 65, 65)" }`}}>{entry.time}</td>
                  <td style={{color:`${(t>entry.time && t<entry.end)?"white":" rgb(66, 65, 65)" }`}}>{entry.subject}</td>
                  <td style={{color:`${(t>entry.time && t<entry.end)?"white":" rgb(66, 65, 65)" }`}}>{entry.faculty}</td>
                  <td style={{color:`${(t>entry.time && t<entry.end)?"white":" rgb(66, 65, 65)" }`}}>{entry.attendence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
          </div>
      </div>
    </div>
  );
};

export default Sidebar;
