import React, {useContext, useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import ExamplesNavbar from "../Navbars/ExamplesNavbar";
import Footer from "../Footer/Footer";
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    CardImg,
    CardTitle,
    Col,
    Container,
    Form, FormGroup, Input,
    InputGroup,
    InputGroupText, Label,
    Row
} from "reactstrap";
import classnames from "classnames";
import {Context} from "../../index";
import Noty from "noty";
import {observer} from "mobx-react-lite";

const Admin = () => {
    const {store} = useContext(Context);
    const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('success');
    const [specialText, setSpecialText] = useState('');
    const [cardsCount, setCardsCount] = useState(store.user.cardsCount);

    const handleSubmit = () => {
        store.makeTransaction(amount, type, () => {
            new Noty({
                type: 'success',
                text: 'Transaction created successfully'
            }).show();
        }, (e) => {
            new Noty({
                type: 'error',
                text: e.response.data.message
            }).show();
        });
    }

    const handleSettingSubmit = () => {

        if(store.special_text !== specialText && specialText !== '') {
            store.setSpecialText(specialText, () => {
                new Noty({
                    type: 'success',
                    text: 'Special text has changed'
                }).show();
            }, (e) => {
                new Noty({
                    type: 'error',
                    text: e.response.data.message
                }).show();
            })
        }

        if(store.user.cardsCount !== cardsCount && cardsCount !== '') {
            store.setCardsCount(cardsCount, () => {
                new Noty({
                    type: 'success',
                    text: 'Cards count has changed'
                }).show();
            }, (e) => {
                new Noty({
                    type: 'error',
                    text: e.response.data.message
                }).show();
            })
        }
    }

    const handleSignSubmit = () => {
        store.signAdmin(password, () => {
            new Noty({
                type: 'success',
                text: 'You are admin'
            }).show();
        }, (e) => {
            new Noty({
                type: 'error',
                text: e.response.data.message
            }).show();
        });
    }

    const [amountFocus, setAmountFocus] = React.useState(false);
    const [typeFocus, setTypeFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [merchantFocus, setMerchantFocus] = React.useState(false);
    const [specialTextFocus, setSpecialTextFocus] = React.useState(false);
    const [cardsCountFocus, setCardsCountFocus] = React.useState(false);

    const [squares1to6, setSquares1to6] = React.useState("");
    const [squares7and8, setSquares7and8] = React.useState("");

    useEffect(() => {
        store.updateSpecialText().then(() => setSpecialText(store.settings.special_text));
        if(!store.isAdmin) {
            document.body.classList.toggle("register-page");
            document.documentElement.addEventListener("mousemove", followCursor);
            // Specify how to clean up after this effect:
            return function cleanup() {
                document.body.classList.toggle("register-page");
                document.documentElement.removeEventListener("mousemove", followCursor);
            };
        }
    },[]);

    const followCursor = (event) => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        setSquares1to6(
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)"
        );
        setSquares7and8(
            "perspective(500px) rotateY(" +
            posX * 0.02 +
            "deg) rotateX(" +
            posY * -0.02 +
            "deg)"
        );
    };

    return store.isAdmin ? (
        <>
            <Helmet>
                <title>{process.env.REACT_APP_NAME} - Admin panel</title>
                <meta charSet="utf-8"/>
            </Helmet>

            <ExamplesNavbar />

            <div className="wrapper">
                <div className="page-header">
                    <div className="page-header-image" />
                    <div className="content">
                        <Container>
                            <Row>
                                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                                    <div
                                        className="square square-7"
                                        id="square7"
                                        style={{ transform: squares7and8 }}
                                    />
                                    <div
                                        className="square square-8"
                                        id="square8"
                                        style={{ transform: squares7and8 }}
                                    />
                                    <Card className="card-register">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("../../assets/img/square-purple-1.png")}
                                            />
                                            <CardTitle tag="h4">Transactions</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Form className="form">
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": amountFocus,
                                                    })}
                                                >
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-coins" />
                                                    </InputGroupText>
                                                    <Input
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        placeholder="Amount"
                                                        type="text"
                                                        onFocus={(e) => setAmountFocus(true)}
                                                        onBlur={(e) => setAmountFocus(false)}
                                                    />
                                                </InputGroup>
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": typeFocus,
                                                    })}
                                                >
                                                    <InputGroupText>
                                                        <i className="fas fa-info-circle" />
                                                    </InputGroupText>
                                                    <Input
                                                        className="form-control"
                                                        type="select"
                                                        value={type}
                                                        onChange={(e) => setType(e.target.value)}
                                                        name="select"
                                                        onFocus={(e) => setTypeFocus(true)}
                                                        onBlur={(e) => setTypeFocus(false)}
                                                    >
                                                        <option>success</option>
                                                        <option>failed</option>
                                                        <option>pending</option>
                                                    </Input>
                                                </InputGroup>
                                            </Form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={handleSubmit} className="btn-round" color="primary" size="lg">
                                                Make transction
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                                    <div
                                        className="square square-7"
                                        id="square7"
                                        style={{ transform: squares7and8 }}
                                    />
                                    <div
                                        className="square square-8"
                                        id="square8"
                                        style={{ transform: squares7and8 }}
                                    />
                                    <Card className="card-register">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("../../assets/img/square-purple-1.png")}
                                            />
                                            <CardTitle tag="h4">Settings</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Form className="form">
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": amountFocus,
                                                    })}
                                                >
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-align-center" />
                                                    </InputGroupText>
                                                    <Input
                                                        value={specialText}
                                                        onChange={(e) => setSpecialText(e.target.value)}
                                                        placeholder="Special text"
                                                        type="textarea"
                                                        onFocus={(e) => setSpecialTextFocus(true)}
                                                        onBlur={(e) => setSpecialTextFocus(false)}
                                                    />
                                                </InputGroup>
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": typeFocus,
                                                    })}
                                                >
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-book-bookmark" />
                                                    </InputGroupText>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        value={cardsCount}
                                                        onChange={(e) => setCardsCount(e.target.value)}
                                                        onFocus={(e) => setCardsCountFocus(true)}
                                                        onBlur={(e) => setCardsCountFocus(false)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </Form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={handleSettingSubmit} className="btn-round" color="primary" size="lg">
                                                Save
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="register-bg" />
                            <div
                                className="square square-1"
                                id="square1"
                                style={{ transform: squares1to6 }}
                            />
                            <div
                                className="square square-2"
                                id="square2"
                                style={{ transform: squares1to6 }}
                            />
                            <div
                                className="square square-3"
                                id="square3"
                                style={{ transform: squares1to6 }}
                            />
                            <div
                                className="square square-4"
                                id="square4"
                                style={{ transform: squares1to6 }}
                            />
                            <div
                                className="square square-5"
                                id="square5"
                                style={{ transform: squares1to6 }}
                            />
                            <div
                                className="square square-6"
                                id="square6"
                                style={{ transform: squares1to6 }}
                            />
                        </Container>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    ) : <>
        <Helmet>
            <title>{process.env.REACT_APP_NAME} - Admin panel</title>
            <meta charSet="utf-8"/>
        </Helmet>
        <ExamplesNavbar />
        <div className="wrapper">
            <div className="page-header">
                <div className="page-header-image" />
                <div className="content">
                    <Container>
                        <Row>
                            <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                                <div
                                    className="square square-7"
                                    id="square7"
                                    style={{ transform: squares7and8 }}
                                />
                                <div
                                    className="square square-8"
                                    id="square8"
                                    style={{ transform: squares7and8 }}
                                />
                                <Card className="card-register">
                                    <CardHeader>
                                        <CardImg
                                            alt="..."
                                            src={require("../../assets/img/square-purple-1.png")}
                                        />
                                        <CardTitle tag="h4">Access denied</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Form className="form">
                                            <InputGroup
                                                className={classnames({
                                                    "input-group-focus": passwordFocus,
                                                })}
                                            >
                                                <InputGroupText>
                                                    <i className="tim-icons icon-lock-circle" />
                                                </InputGroupText>
                                                <Input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Password"
                                                    type="password"
                                                    onFocus={(e) => setPasswordFocus(true)}
                                                    onBlur={(e) => setPasswordFocus(false)}
                                                />
                                            </InputGroup>
                                        </Form>
                                    </CardBody>
                                    <CardFooter>
                                        <Button onClick={handleSignSubmit} className="btn-round" color="primary" size="lg">
                                            Go to admin
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                        <div className="register-bg" />
                        <div
                            className="square square-1"
                            id="square1"
                            style={{ transform: squares1to6 }}
                        />
                        <div
                            className="square square-2"
                            id="square2"
                            style={{ transform: squares1to6 }}
                        />
                        <div
                            className="square square-3"
                            id="square3"
                            style={{ transform: squares1to6 }}
                        />
                        <div
                            className="square square-4"
                            id="square4"
                            style={{ transform: squares1to6 }}
                        />
                        <div
                            className="square square-5"
                            id="square5"
                            style={{ transform: squares1to6 }}
                        />
                        <div
                            className="square square-6"
                            id="square6"
                            style={{ transform: squares1to6 }}
                        />
                    </Container>
                </div>
            </div>
            <Footer />
        </div>
    </>;
};

export default observer(Admin);