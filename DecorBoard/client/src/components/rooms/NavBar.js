import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { RoomContext } from '../../providers/RoomProvider';
import { RoomNav } from './RoomNav';
import './Room.css';

export const NavBar = () => {
    const { rooms, getRooms } = useContext(RoomContext)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        getRooms(currentUser.id)
        // eslint-disable-next-line       
    }, [])

    return (
        <>
            <section className="navContainer">
                <Col className="navColumn">
                    <Row className="navRow">
                        <NavLink to="/design"><div className="navText">Design a New Room!</div></NavLink>
                    </Row>

                    <div className="roomNav">
                        {rooms.map(r =>
                            <RoomNav key={r.id} room={r} />
                        )}
                    </div>

                    <Row className="navRow">
                        <NavLink to="/stockRoom"><div className="navText">Stock Room</div></NavLink>
                    </Row>
                </Col>
            </section>
        </>
    )
}