import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";

export const ItemContext = createContext();

export const ItemProvider = ( props ) => {
    const apiUrl = "/api/item";
    const { getToken } = useContext(UserProfileContext)
    const [items, setItems] = useState([])
    const [currentItemView, setCurrentItemView] = useState({})
    const history = useHistory();
    
    const getItems = () => {
        return getToken().then((token) =>
        fetch(apiUrl, {
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
        .then((resp) => setCurrentItemView(resp))
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
            .then(resp => item = resp.json())          
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
            .then((item) => getItems())     
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
            .then(() => getItems()) 
        )
    }

    return (
        <ItemContext.Provider value={{ items, getItems, addItem, updateItem, deleteItem, currentItemView, setCurrentItemView, getItemById }}>
            {props.children}
        </ItemContext.Provider>
    )
}