/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip, ModalBody, ModalFooter, Modal,
} from "reactstrap";
import {CABINET_ROUTE, LOGIN_ROUTE, HOME_ROUTE} from "../../utils/routes";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Footer = () => {
  const {store} = useContext(Context);
  const toggleModal = () => store.setRegisterModal(!store.registerModal);
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">{process.env.REACT_APP_NAME}•</h1>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink to={HOME_ROUTE} tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={LOGIN_ROUTE} tag={Link}>
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"#"} onClick={toggleModal}>
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={CABINET_ROUTE} tag={Link}>
                  Profile
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink href="https://www.probiller.com/contact-us/">
                  Contact Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.probiller.com/about/">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.probiller.com/security/">
                  Payment Security
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://opensource.org/licenses/MIT">
                  License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="title">Follow us:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href={process.env.REACT_APP_TWITTER_LINK}
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href={process.env.REACT_APP_FACEBOOK_LINK}
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href={process.env.REACT_APP_INSTAGRAMM_LINK}
                id="tooltip318450378"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default observer(Footer);