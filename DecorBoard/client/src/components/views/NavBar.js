import React from 'react';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Layout.css';

export const NavBar = () => {
    return (
        <>
            <section className="navContainer">
                <Col className="navColumn">
                    <Row className="navRow">
                        <NavLink to="/design">Design a New Room!</NavLink>
                    </Row>
                    <Row className="navRow">
                        <NavLink to="/room">Room 1</NavLink>
                    </Row>
                    <Row className="navRow">Room 2</Row>
                    <Row className="navRow">Room 3</Row>
                    <Row className="navRow">Room 4</Row>
                    <Row className="navRow">Stock Room</Row>
                </Col>
            </section>
        </>
    )
}