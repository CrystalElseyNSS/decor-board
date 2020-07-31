import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button, NavLink } from 'reactstrap';
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import "./Room.css";

export const Room = () => {

    // Gets room id from route parameter and sets application view to the clicked room:
    const { currentRoomView, getRoomById } = useContext(RoomContext)
    const { id } = useParams()
    useEffect(() => {
        getRoomById(id)
    }, [])

    // Renders JSX code for room model: 
    return (
        <>
            <section className="roomContainer" style={{ backgroundImage: `url(/uploads/` + currentRoomView.imageLocation + `)` }}>
                <section className="itemGrid">

                </section>
            </section>
            <div className="roomBtns">
                <div className="header--roomName">{currentRoomView.roomName}</div>
                <div className="header--roomMenu">Menu:</div>
                <Button className="btn--roomMenu white">➕</Button>
                <NavLink to="/editRoom"><Button className="btn--roomMenu white">📝</Button></NavLink>
                <Button className="btn--roomMenu white">❌</Button>
            </div>












        </>
    )
}