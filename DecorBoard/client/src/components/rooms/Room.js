import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import "./Room.css";

export const Room = () => {
    const { currentRoomView, getRoomById } = useContext(RoomContext)

    const { id } = useParams();
    
    useEffect(() => {
        getRoomById(id);
    }, []);

    return (
        <>
            <section className="roomContainer">
                <h3>{currentRoomView.roomName}</h3>
            </section>
        </>
    )
}