import './Footer.css';
import logo from '../Images/mainlogo.png';
import twitter from '../Images/twitter.png';
import linkedIn from '../Images/linkedIn.png';
import insta from '../Images/insta.png';
function Footer(){
    return(
        <div>
            <div className="FooterOuter">
              <div className="FooterLeftSection">
                <div className="Quicklink">
                    <ul> 
                        <h3>Quick Links</h3><br></br>
                        <li>Admission</li>
                        <li>Academic</li>
                        <li>Syllabus</li>
                        <li>Scholarship</li>
                    </ul>
                </div>
                <div className="Admission">
                    <ul>
                        <h3>Admission</h3><br></br>
                        <li>Admission Open</li>
                        <li>Fee Structure</li>
                        <li>Registration Form</li>
                        <li>Anti-ragging</li>
                    </ul>
                </div>
              </div>  
              <div className="FooterCollegeSection">
                  <div className="CollegeDetailSection">
                    <div><img src={logo} height="80px" width="800px;"/></div>
                    <div className="CollegeName">Dr. Ambedkar Institute of Technology For Handicapped, Kanpur</div>                  
                  </div>
                  <div>
                    <div className="social-icons">
                        <a href="#" className="icon"><img src={twitter} height="40px" width="40px"/></a>
                        <a href="#" className="icon"><img src={linkedIn} height="40px" width="40px"/></a>
                        <a href="#" className="icon"><img src={insta} height="40px" width="40px"/></a>
                    </div>
                   </div>
                </div>
            </div>
            <div className="Copyright">Copyright @ 2024 -All E-proximity rights are reserved</div>
        </div>
    );
}
export default Footer;