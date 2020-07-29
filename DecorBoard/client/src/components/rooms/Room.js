import React from 'react';
import { Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import "../views/Layout.css";

export const Room = ({ room }) => {
    
    return (
        <>
            <Row className="navRow">
                <NavLink to="/room/room">{room.roomName}</NavLink>                
            </Row>
        </>
    )
}