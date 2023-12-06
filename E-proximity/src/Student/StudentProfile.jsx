import './StudentProfile.css'
import Header from './Header.jsx'
import Sidebar from './SideBar.jsx'
import './All.css'
import StudentPhoto from '../Images/mam.jpg'
import StudentSignature from '../Images/mam.jpg'
import Table from './Table.jsx'
import Sticky from 'react-stickynode'
function StudentProfile(){
    return(
     <div className='grid-container'>
        <Header/>
        <Sticky><Sidebar/></Sticky>
        <div className='ProfileMainContent'>
           <div className='PhotoSectionOuter'>
               <h2>Student Profile</h2>
               <div className='photoSection'>
                  <div>
                  <img src={StudentPhoto}  className='StudentImg'/><br/><span>Student Photo</span>
                  </div>
                  <div>
                  <img src={StudentSignature} className='StudentImg'/><br/><span>Student Signature</span>
                  </div>
               </div>
           </div>
           <div className='InformationSectionOuter'>
              <div className='InformationSectionOuterHeader'></div>
                <div className='information'>
                   <h6>Acadmic Information</h6>
                   <div className='table'>
                    <Table/>
                   </div>
                </div>
              <div className='information'>
                  <h6>Contact Information</h6>
                  <div className='table'>
                    <Table/>
                   </div>
              </div>
              <div className='information'>
                  <h6>Personal Information</h6>
                  <div className='table'>
                    <Table/>
                   </div>
              </div>             
           </div>
        </div>
     </div>
    );
}
export default StudentProfile;