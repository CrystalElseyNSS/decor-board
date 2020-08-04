import React from 'react';
import "./Item.css";


export const Item = ({ item }) => {

    return (
        <>
        <div className="item">
            <a target="blank" href={`${item.itemUrl}`}>
                <div className="itemImage"
                    style={{ backgroundImage: `url(/uploads/` + item.imageLocation + `)` }}>
                </div>
            </a>
            <div className="hide itemDescription">
                <p className="itemDescription">{item.itemName}: ${item.itemPrice}</p>
            </div>
        </div>
        </>
    )
}