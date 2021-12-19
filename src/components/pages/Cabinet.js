import React, {useContext, useEffect, useState} from 'react';
import PerfectScrollbar from "perfect-scrollbar";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter,
    Nav,
    NavItem,
    NavLink, Pagination, PaginationItem, PaginationLink,
    Row, TabContent, Table, TabPane, UncontrolledCarousel,
    UncontrolledTooltip
} from "reactstrap";
import classnames from "classnames";

import ExamplesNavbar from "../Navbars/ExamplesNavbar.js";
import Footer from "../Footer/Footer.js";
import Transaction from "../Transaction";
import {Context} from "../../index";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import faker from 'faker';
import {Helmet} from "react-helmet";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Merchant chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Crypto',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: '#e14eca',
            backgroundColor: '#e14ecac2',
        },
        {
            label: 'USD',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: '#00f2c3',
            backgroundColor: '#00f2c3b0',
        },
    ],
};

let ps = null;

const Cabinet = () => {
    const {store} = useContext(Context);
    const [tabs, setTabs] = useState(1);
    const [pills, setPills] = React.useState(1);
    const [withdrawModal, setWithdrawModal] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const toggleWithdrawModal = () => setWithdrawModal(!withdrawModal);

    useEffect(() => {
        store.getTransactions().then(rs => setTransactions(rs))
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
        document.body.classList.toggle("profile-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
                document.documentElement.className += " perfect-scrollbar-off";
                document.documentElement.classList.remove("perfect-scrollbar-on");
            }
            document.body.classList.toggle("profile-page");
        };
    },[]);

    return (
        <>
            <Helmet>
                <title>{process.env.REACT_APP_NAME} - Personal cabinet</title>
                <meta charSet="utf-8"/>
            </Helmet>
            <ExamplesNavbar />
            <div className="wrapper">
                <div className="page-header">
                    <img
                        alt="..."
                        className="dots"
                        src={require("../../assets/img/dots.png")}
                    />
                    <img
                        alt="..."
                        className="path"
                        src={require("../../assets/img/path4.png")}
                    />
                    <Container className="align-items-center">
                        <Row>
                            <Col lg="6" md="6">
                                <h1 className="profile-title text-left">Transactions</h1>
                                <h5 className="text-on-back">01</h5>
                                <div className="transactions">
                                    {transactions.map((transaction, index) => {
                                        return <Transaction key={index} transaction={transaction} />;
                                    })}
                                </div>
                            </Col>
                            <Col className="ml-auto mr-auto" lg="4" md="6">
                                <Card className="card-coin card-plain">
                                    <CardHeader>
                                        <img
                                            alt="..."
                                            className="img-center img-fluid rounded-circle"
                                            src={require("../../assets/img/logo.svg")}
                                        />
                                        <h4 className="title">{store.user.email}</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <Nav
                                            className="nav-tabs-primary justify-content-center"
                                            tabs
                                        >
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: tabs === 1,
                                                    })}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setTabs(1);
                                                    }}
                                                    href="#pablo"
                                                >
                                                    Wallet
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: tabs === 2,
                                                    })}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setTabs(2);
                                                    }}
                                                    href="#pablo"
                                                >
                                                    Withdraw
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: tabs === 3,
                                                    })}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setTabs(3);
                                                    }}
                                                    href="#pablo"
                                                >
                                                    Merchants
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent
                                            className="tab-subcategories"
                                            activeTab={"tab" + tabs}
                                        >
                                            <TabPane tabId="tab1">
                                                <Table className="tablesorter" responsive>
                                                    <thead className="text-primary">
                                                    <tr>
                                                        <th className="header">USD</th>
                                                        <th className="header">AMOUNT</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>USD</td>
                                                        <td>{store.user.balance}$</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                                <Table className="tablesorter" responsive>
                                                    <thead className="text-primary">
                                                    <tr>
                                                        <th className="header">COIN</th>
                                                        <th className="header">AMOUNT</th>
                                                        <th className="header">VALUE</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>BTC</td>
                                                        <td>0</td>
                                                        <td>0.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ETH</td>
                                                        <td>1</td>
                                                        <td>3,989.25 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>XRP</td>
                                                        <td>0</td>
                                                        <td>0.00 USD</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </TabPane>
                                            <TabPane tabId="tab2">
                                                <Nav className="nav-pills-info nav-pills-icons" pills>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({
                                                                "active show": pills === 1,
                                                            })}
                                                            onClick={(e) => setPills(1)}
                                                            href="#pablo"
                                                        >
                                                            <i className="fab fa-bitcoin"></i>
                                                            To crypto
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({
                                                                "active show": pills === 2,
                                                            })}
                                                            onClick={(e) => setPills(2)}
                                                            href="#pablo"
                                                        >
                                                            <i className="fas fa-credit-card"></i>
                                                            To bank card
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                                <Button
                                                    className="btn-simple btn-icon btn-round float-right"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={toggleWithdrawModal}
                                                >
                                                    <i className="fas fa-arrow-right" />
                                                </Button>
                                                <Modal isOpen={withdrawModal} toggle={toggleWithdrawModal}>
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">
                                                            Withdraw noney
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-hidden="true"
                                                            onClick={toggleWithdrawModal}
                                                        >
                                                            <i className="tim-icons icon-simple-remove" />
                                                        </button>
                                                    </div>
                                                    <ModalBody>
                                                        <p>To withdraw money, you must first purchase a special package worth ${process.env.REACT_APP_SPECIAL_PRICE}. To do this, please contact support</p>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={toggleWithdrawModal}>
                                                            Ok
                                                        </Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </TabPane>
                                            <TabPane tabId="tab3">
                                                <div className="merchants">
                                                    <div className="merchant">
                                                        <div className="merchant-left">
                                                            <div className="merchant-name">Makao777</div>
                                                            <div className="merchant-url">https://www.makao777.com</div>
                                                        </div>
                                                        <div className="merchant-right">
                                                            <div className="merchant-status">
                                                                <i className="far fa-check-circle"></i> Active
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="section">
                    <Container>
                        <Row className="justify-content-between">
                            <Col md="6">
                                <Row className="justify-content-between align-items-center">
                                    <Line data={data} options={options} />
                                </Row>
                            </Col>
                            <Col md="5">
                                <h1 className="profile-title text-left">Merchant</h1>
                                <h5 className="text-on-back">02</h5>
                                <p className="profile-description text-left">
                                    An artist of considerable range, Ryan — the name taken by
                                    Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                                    performs and records all of his own music, giving it a warm,
                                    intimate feel with a solid groove structure. An artist of
                                    considerable range.
                                </p>
                                <div className="btn-wrapper pt-3">
                                    <Button
                                        className="btn-simple"
                                        color="primary"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="tim-icons icon-book-bookmark" /> Bookmark
                                    </Button>
                                    <Button
                                        className="btn-simple"
                                        color="info"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="tim-icons icon-bulb-63" /> Check it!
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <section className="section">
                    <Container>
                        <Row>
                            <Col md="6">
                                <Card className="card-plain">
                                    <CardHeader>
                                        <h1 className="profile-title text-left">Contact</h1>
                                        <h5 className="text-on-back">03</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Your Name</label>
                                                        <Input defaultValue="Mike" type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Email address</label>
                                                        <Input placeholder="mike@email.com" type="email" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Phone</label>
                                                        <Input defaultValue="001-12321345" type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Company</label>
                                                        <Input defaultValue="CreativeTim" type="text" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label>Message</label>
                                                        <Input placeholder="Hello there!" type="text" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button
                                                className="btn-round float-right"
                                                color="primary"
                                                data-placement="right"
                                                id="tooltip341148792"
                                                type="button"
                                            >
                                                Send text
                                            </Button>
                                            <UncontrolledTooltip
                                                delay={0}
                                                placement="right"
                                                target="tooltip341148792"
                                            >
                                                Can't wait for your message
                                            </UncontrolledTooltip>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="ml-auto" md="4">
                                <div className="info info-horizontal">
                                    <div className="icon icon-primary">
                                        <i className="tim-icons icon-square-pin" />
                                    </div>
                                    <div className="description">
                                        <h4 className="info-title">Find us at the office</h4>
                                        <p>
                                            Bld Mihail Kogalniceanu, nr. 8, <br />
                                            7652 Bucharest, <br />
                                            Romania
                                        </p>
                                    </div>
                                </div>
                                <div className="info info-horizontal">
                                    <div className="icon icon-primary">
                                        <i className="tim-icons icon-mobile" />
                                    </div>
                                    <div className="description">
                                        <h4 className="info-title">Give us a ring</h4>
                                        <p>
                                            Michael Jordan <br />
                                            +40 762 321 762 <br />
                                            Mon - Fri, 8:00-22:00
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default Cabinet;