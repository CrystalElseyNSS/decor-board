import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import "./Room.css";

export const Room = () => {
    const { currentRoomView, getRoomById } = useContext(RoomContext)

    // const { getImgURL } = useContext(UploadImgContext)
    // const imgURL = getImgURL(currentRoomView.imageLocation)

    const { id } = useParams();
    useEffect(() => {
        getRoomById(id)
    }, []);
    
    return (
        <>
            <section className="roomContainer" style={{backgroundImage: `url(/uploads/` + currentRoomView.imageLocation + `)`}}>
                <h3>{currentRoomView.roomName}</h3>
            </section>
        </>
    )
}