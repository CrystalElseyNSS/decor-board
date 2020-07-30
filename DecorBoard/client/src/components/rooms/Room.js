import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import "./Room.css";

export const Room = ({ appView }) => {
    const { currentRoomView, getRoomById } = useContext(RoomContext)
    const {getImgURL} = useContext(UploadImgContext)
    let tacoRoom = { roomName: "" }
    const imgURL = getImgURL(tacoRoom.imageLocation)

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
            <section className="roomContainer" style={`background-image: ${tacoRoom.imageLocation}`}>
                <h3>{tacoRoom.roomName}</h3>
            </section>
        </>
    )
}


