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
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip, ModalBody, ModalFooter, Modal,
} from "reactstrap";
import {CABINET_ROUTE, LOGIN_ROUTE} from "../../utils/routes";
import {Context} from "../../index";

export default function ExamplesNavbar() {
  const {store} = useContext(Context);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  },[]);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>{process.env.REACT_APP_NAME}• </span>
            Payment system
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Perfect choice!
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href={process.env.REACT_APP_TWITTER_LINK}
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href={process.env.REACT_APP_FACEBOOK_LINK}
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href={process.env.REACT_APP_INSTAGRAMM_LINK}
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={toggleModal}>
                Have any problems?
              </NavLink>
            </NavItem>
            <NavItem style={{color: 'white !important'}} tag={Link} to={store.isAuth ? CABINET_ROUTE : LOGIN_ROUTE}>
              <Button

                  className="nav-link d-lg-block"
                  color="primary"
              >
                {store.isAuth ? 'Personal cabinet' : <><i className="tim-icons icon-spaceship"/> Try It Just Now!</>}
              </Button>
            </NavItem>
            {store.isAuth ? (
                <NavItem style={{color: 'white !important'}}>
                  <Button
                      onClick={store.logout}
                      className="nav-link d-lg-block"
                      color="primary"
                  >
                   Logout
                  </Button>
                </NavItem>
            ) : ''}
          </Nav>
        </Collapse>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Contact us
          </h5>
          <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={toggleModal}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <ModalBody>
          <p>
            If you have any problems you can contact support
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </Navbar>
  );
}
