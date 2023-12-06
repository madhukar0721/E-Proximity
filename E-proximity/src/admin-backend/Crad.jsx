import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';


export default function App(props) {
  return (
    <MDBCard style={{boxShadow:"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",maxWidth:300,padding:"4rem 5rem",background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))'}}>
      <MDBCardBody>
        <MDBCardTitle style={{color:'whitesmoke'}}>{props.name}</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
  );
}
