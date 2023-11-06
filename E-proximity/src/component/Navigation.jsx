import React,{Component} from "react";
import './Navigation.css';
import {Navbar,Container,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import aithlogo from '../Images/aithlogo.png';
export default class Navigation extends Component{
  render(){
    return(
      <div>
        <Navbar expand="lg" variant={"dark"} className=" navigtioncss">
        <Container fluid>
          <Navbar.Brand href="#">E-Proximity</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <NavDropdown title="Login" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3" >Student</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Faculty</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Admin</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">About</Nav.Link>
              <Nav.Link href="#action3">Contact</Nav.Link>
              <Nav.Link href="#action4">Academic</Nav.Link>
              <Nav.Link href="#action5">Strength</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    <div className="lower-header">
      <div className="collegetitle">
            <div className="eproximity-logo"><img src={aithlogo} width="75px"/></div>
            <div className="title">Dr. Ambedkar Institute Of Technology For Handicapped, Kanpur</div>
      </div>
      <div className="addresstitle">
            <div className="address">Awadhpuri , Khyora <br></br>Near Rama Dental College , Kanpur</div>
            <div className="location-icon"><img src={aithlogo} width="35px"/></div>
      </div>
    </div>
      </div>
    )
  }
}