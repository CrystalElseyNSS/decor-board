// React imports:
import React, { useContext } from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
// Component imports: 
import { RoomContext } from '../../providers/RoomProvider';
// Design import: 
import "./Nav.css";

export const RoomNav = ({ room }) => {
    // imports setCurrentRoomView function to set CurrentRoomView state: 
    const { setCurrentRoomView } = useContext(RoomContext)

    // Renders JSX of individual NavBar room components:
    return (
        <>
           <Row className="navRow">
                <Link 
                    // Sets CurrentRoomView in RoomProvider based on user-selected RoomNav:
                    onClick={() => setCurrentRoomView(room)}
                    to={`/room/room/${room.id}`}
                >
                    <div className="navText">{room.roomName}</div>
                </Link>                
            </Row>
        </>
    )
}