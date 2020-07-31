import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";

export const RoomContext = createContext();

export const RoomProvider = ( props ) => {
    const apiUrl = "/api/room";
    const { getToken } = useContext(UserProfileContext)
    const [rooms, setRooms] = useState([])
    const [currentRoomView, setCurrentRoomView] = useState({})
    const history = useHistory();
    
    const getRooms = () => {
        return getToken().then((token) =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`
            }
        }) 
        .then(resp => resp.json())
        .then(setRooms))
    }

    const getRoomById = (id) => {
        return getToken().then((token) =>
        fetch(`${apiUrl}/room/${id}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`
            }
        }) 
        .then(resp => resp.json())
        .then((resp) => setCurrentRoomView(resp))
        )
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
            .then(resp => room = resp.json())          
        )
    }

    const updateRoom = (room) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "PUT",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                },
                body: JSON.stringify(room)
            })
            .then(resp => room = resp.json())          
        )
    }

    return (
        <RoomContext.Provider value={{ rooms, getRooms, addRoom, updateRoom, currentRoomView, setCurrentRoomView, getRoomById }}>
            {props.children}
        </RoomContext.Provider>
    )
}