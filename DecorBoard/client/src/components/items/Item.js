import React from 'react';
import "./Item.css";


export const Item = ({ item }) => {

    return (
        <>
            <a className="item" target="blank" href={`${item.imageUrl}`}>
                <div className="itemImage"
                    style={{ backgroundImage: `url(/uploads/` + item.imageLocation + `)` }}>
                </div>
                <div className="hide itemDescription">
                    <p className="itemDescription">{item.itemName}: ${item.itemPrice}</p>
                </div>
            </a>
        </>
    )
}