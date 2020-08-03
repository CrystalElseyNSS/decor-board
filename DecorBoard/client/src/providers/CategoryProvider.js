import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = createContext();

export const CategoryProvider = ( props ) => {
    const apiUrl = "/api/category";
    const { getToken } = useContext(UserProfileContext)
    const [categories, setCategories] = useState([])
    
    const getCategories = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 
            .then(resp => resp.json())
            .then(setCategories)
        )
    }

    const getCategoryById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 
            .then(resp => resp.json())
        )
    }

    return (
        <CategoryContext.Provider value={{ categories, getCategories, getCategoryById }}>
            {props.children}
        </CategoryContext.Provider>
    )
}