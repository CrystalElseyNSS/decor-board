import React, { useContext, useEffect } from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RoomContext } from '../../providers/RoomProvider';
import "../views/Layout.css";

export const RoomNav = ({ room, setAppView }) => {
    
    return (
        <>
           <Row className="navRow">
                <Link 
                    onClick={() => setAppView(room)}
                    to={`/room/room/${room.id}`}
                >
                    {room.roomName}
                </Link>                
            </Row>
        </>
    )
}