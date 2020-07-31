import React, { useContext, useEffect, useRef } from 'react';
import { Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RoomContext } from '../../providers/RoomProvider';
import "../views/Layout.css";

export const RoomNav = ({ room }) => {
    const { setCurrentRoomView } = useContext(RoomContext)

    return (

        <>
           <Row className="navRow">
                <Link 
                    
                    onClick={() => setCurrentRoomView(room)}
                    to={`/room/room/${room.id}`}
                >
                    <div className="navText">{room.roomName}</div>
                </Link>                
            </Row>
        </>
    )
}
