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

const Admin = () => {
    const {store} = useContext(Context);
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('success');

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

    const [squares1to6, setSquares1to6] = React.useState("");
    const [squares7and8, setSquares7and8] = React.useState("");
    const [amountFocus, setAmountFocus] = React.useState(false);
    const [typeFocus, setTypeFocus] = React.useState(false);
    React.useEffect(() => {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", followCursor);
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.classList.toggle("register-page");
            document.documentElement.removeEventListener("mousemove", followCursor);
        };
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

    return (
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

    );
};

export default Admin;