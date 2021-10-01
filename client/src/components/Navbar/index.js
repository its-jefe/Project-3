import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "../SignupForm";
import LoginForm from "../LoginForm";
import "./style.css";

import Auth from "../../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
        <Container fluid id="container">
          <Navbar.Brand as={Link} to="/" id="link">
            <span id="btn">Home page</span>
          </Navbar.Brand>


          <Navbar.Toggle aria-controls="navbar" />

          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/gamepage">
                    <span id="btn">Snake</span>
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Navbar.Brand as={Link} id="link">
                  <Nav.Link onClick={() => setShowModal(true)}>
                    <span id="btn"> Login/Sign Up </span>
                  </Nav.Link>
                </Navbar.Brand>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* set modal data up */}
      <Modal
        id="login-signup"
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton id="closebtn">
            {/* <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title> */}
          </Modal.Header>

          <Modal.Body>
            <Tab.Content>
              <div id="form-title">
                <h2>Login</h2>
                <Tab.Pane eventKey="login">
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </div>
              <div id="form-title">
                <h2>Sign Up</h2>
                <Tab.Pane eventKey="signup">
                  <SignUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </div>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
