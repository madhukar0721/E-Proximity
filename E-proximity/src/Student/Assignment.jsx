import React from 'react';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Sticky from 'react-stickynode';
import './Assignment.css';
function Assignment(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)}
return(
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sticky><Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} className="scroll"/></Sticky>
        <div className='Assignment-Container'>
            <h3>Assignment Details</h3>
            <div className='Notification-Bar'>
                <h6>Pending Assignments</h6>
            </div>
            <div className='Submission-Card'>
                <div className='Input-Area'>
                  <input type='text' placeholder='Write your content....'/>
                </div>
                <div className='Upload-Card'>
                    <input type="file" 
                    class="filepond"
                    name="filepond"
                    accept="image/png, image/jpeg, image/gif"/>
                    <button className='btn-assign' type='submit'>Upload</button>
                </div>
                
                
            </div>
           
        </div>
    </div>
)
}
export default Assignment;