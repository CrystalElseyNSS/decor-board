import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button } from 'reactstrap';
import { useParams, NavLink } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import "./Room.css";

export const Room = () => {

    // Gets room id from route parameter and sets application view to the clicked room:
    const { currentRoomView, getRoomById, deleteRoom } = useContext(RoomContext)
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
                <NavLink to={`/addItem`}><Button className="btn--roomMenu white">➕</Button></NavLink>
                <NavLink to={`/room/editRoom/${currentRoomView.id}`}><Button className="btn--roomMenu white">📝</Button></NavLink>
                <Button 
                    className="btn--roomMenu white"
                    onClick={() =>
                        window.confirm(
                          "Are you sure you wish to delete this board?"
                        ) && deleteRoom(currentRoomView.id)
                      }>❌
                </Button>
            </div>












        </>
    )
}