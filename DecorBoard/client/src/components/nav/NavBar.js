// React imports: 
import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
// Component imports: 
import { RoomContext } from '../../providers/RoomProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { RoomNav } from '../nav/RoomNav';
// Design import: 
import './Nav.css';

export const NavBar = () => {

    const { isLoggedIn, logout } = useContext(UserProfileContext)

    // Gets rooms by currentUser and dynamically renders NavBar on page load: 
    const { rooms, getRooms } = useContext(RoomContext)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        getRooms(currentUser.id)
        // eslint-disable-next-line       
    }, [])

    // Maps through rooms array and renders JSX for NavBar:
    return (
        <>
            <section className="navContainer">
                <Col className="navColumn">
                    <Row className="navRow">
                        <NavLink to="/design">
                            <div className="navText">Design a New Room!</div>
                        </NavLink>
                    </Row>
                    <div>
                        {rooms.map(r =>
                            <RoomNav key={r.id} room={r} />
                        )}
                    </div>
                    <Row className="navRow">
                        <NavLink to="/stockRoom">
                            <div className="navText">Stock Room</div>
                        </NavLink>
                    </Row>
                    <Row>
                        { isLoggedIn ? <NavLink to="/login" onClick={logout} className="logout">Logout</NavLink> : <div></div> }
                    </Row>
                </Col>
            </section>
        </>
    )
}