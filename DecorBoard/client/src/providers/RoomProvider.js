import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const RoomContext = createContext();

export const RoomProvider = ( props ) => {
    const apiUrl = "/api/room/";
    const { getToken } = useContext(UserProfileContext)
    const [rooms, setRooms] = useState([])
    
    const getRooms = (userId) => {
        getToken().then((token) =>
        fetch(`apiUrl${userId}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(setRooms))
    }

    const addRoom = (room) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                },
                body: JSON.stringify(room)
            })
            .then(resp => resp.json())
            .then(getRooms)
        )
    }

    return (
        <RoomContext.Provider value={{ rooms, getRooms, addRoom }}>
            {props.children}
        </RoomContext.Provider>
    )
}