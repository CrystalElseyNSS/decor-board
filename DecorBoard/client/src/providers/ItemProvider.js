import React, { useState, createContext, useContext } from "react";
import { useParams } from 'react-router-dom';
import { UserProfileContext } from './UserProfileProvider';
import { RoomContext } from '../providers/RoomProvider';
export const ItemContext = createContext();

export const ItemProvider = (props) => {
    const apiUrl = "/api/item";
    const { getToken } = useContext(UserProfileContext)
    const { currentRoomView } = useContext(RoomContext)
    const [items, setItems] = useState([])
    const [itemTotal, setItemTotal] = useState(0)

    const getItemsByRoom = (roomId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${roomId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(setItems))
    }

    const getItemById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/item/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
        )
    }

    const getItemTotal = (roomId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/budget/${roomId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then((resp) => setItemTotal(resp))
            )
    }

    const addItem = (item) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
                .then((item) => getItemsByRoom())
        )
    }

    const updateItem = (item) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/editItem/${item.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
                .then((item) => getItemsByRoom())
        )
    }

    const deleteItem = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
                .then(() => getItemsByRoom(currentRoomView.id))
        )
    }

    return (
        <ItemContext.Provider value={{ items, getItemsByRoom, addItem, updateItem, deleteItem, getItemById, getItemTotal, itemTotal }}>
            {props.children}
        </ItemContext.Provider>
    )
}