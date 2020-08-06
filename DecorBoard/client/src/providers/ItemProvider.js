import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';
export const ItemContext = createContext();

export const ItemProvider = (props) => {
    const apiUrl = "/api/item";
    const { getToken } = useContext(UserProfileContext)
    const [items, setItems] = useState([])
    const [itemTotal, setItemTotal] = useState(0)
    const [currentItem, setItem] = useState({})

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
                .then((item) => getItemsByRoom(item.roomId))
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
                .then(() => getItemsByRoom(item.roomId))
        )
    }

    const deleteItem = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
        )
    }

    return (
        <ItemContext.Provider value={{ items, getItemsByRoom, addItem, updateItem, deleteItem, getItemById, getItemTotal, itemTotal, currentItem }}>
            {props.children}
        </ItemContext.Provider>
    )
}