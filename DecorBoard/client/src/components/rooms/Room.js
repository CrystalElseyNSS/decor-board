import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import "./Room.css";

export const Room = ({ appView }) => {
    const { currentRoomView, getRoomById } = useContext(RoomContext)
    let tacoRoom = { roomName: "" }
    const { id } = useParams();
    useEffect(() => {
        getRoomById(id)
    }, []);

    if (Object.keys(appView).length !== 0) {
        tacoRoom = appView
    } else if (Object.keys(currentRoomView).length !== 0) {
        tacoRoom = currentRoomView
    } return (
        <>
            <section className="roomContainer">
                <h3>{tacoRoom.roomName}</h3>
            </section>
        </>
    )
}