import React, { useContext, useEffect } from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RoomContext } from '../../providers/RoomProvider';
import "../views/Layout.css";

export const RoomNav = ({ room }) => {
    // const { setCurrentRoomView } = useContext(RoomContext)
    
    // useEffect(() => {        
    //     setCurrentRoomView(room);        
    //     // eslint-disable-next-line       
    // }, [])

    return (
        <>
           <Row className="navRow">
                <Link 

                    to={`/room/room/${room.id}`}
                >
                    {room.roomName}
                </Link>                
            </Row>
        </>
    )
}