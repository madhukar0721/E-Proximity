import './About.css';
import Image from '../Images/photo.jpeg';
function About(){
    return(
        <div className="AboutOuter">
            <div className="AboutDescriptionSection">
                <span className="AboutDescriptionHeading">
                    A<span className="Aboutunderline">bout</span> E-proximity
                </span>
                <div className="AboutDescription">
                  <p>
                    In electromagnetics, proximity effect is a redistribution of electric current occurring in nearby
                    parallel electrical conductors carrying alternating current, caused by magnetic effects. 
                    In adjacent conductors carrying in the  electrical conductors carrying alternating current, caused by magnetic effects. 
                    In adjacent conductors carrying in the 
                  </p>
                </div>
            </div>
            <div className="AboutPhotoSection">
                <img src={Image} height="150px" width="150px" className="AboutImg"/>
                <br/>
                <span className="AboutImageCaption">Professor Rachna Aasthna</span><br/>
                <span className="AboutImageCaptionbottom">Director AITH,kanpur</span>               
            </div>
        </div>
    );
}
export default About;