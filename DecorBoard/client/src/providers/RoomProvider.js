import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";

export const RoomContext = createContext();

export const RoomProvider = ( props ) => {
    const apiUrl = "/api/room";
    const { getToken } = useContext(UserProfileContext)
    const [rooms, setRooms] = useState([])
    const history = useHistory();
    
    const getRooms = (userId) => {
        return getToken().then((token) =>
        fetch(`${apiUrl}/${userId}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(setRooms))
    }

    const addRoom = (room) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                },
                body: JSON.stringify(room)
            })
            .then(resp => resp.json())
            .then(history.push())
            .then(() => getRooms(room.userProfileId))
        )
    }

    return (
        <RoomContext.Provider value={{ rooms, getRooms, addRoom }}>
            {props.children}
        </RoomContext.Provider>
    )
}