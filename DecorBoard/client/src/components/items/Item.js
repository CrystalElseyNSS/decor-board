import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ItemContext } from '../../providers/ItemProvider';
import "./Item.css";


export const Item = ({ item }) => {
    const { deleteItem } = useContext(ItemContext)

    return (
        <>
        <div className="itemDiv">
            <a className="item" target="blank" href={`${item.itemUrl}`}>
                <div className="itemImage"
                    style={{ backgroundImage: `url(/uploads/` + item.imageLocation + `)` }}>
                </div>
                <div className="hide itemDescription">
                    <p className="itemDescription">{item.itemName}: ${item.itemPrice}</p>
                </div>
            </a>
            <div className="btns--itemEdit">
                <NavLink to={`/room/editItem/${item.id}`}>
                    <Button size="sm" className="btn--itemMenu white">
                        <span role="img" aria-label="write" className="emoji">📝</span>
                    </Button>
                </NavLink>
                <Button
                    size="sm"
                    className="btn--itemMenu white"
                    onClick={() =>
                        window.confirm(
                            "Are you sure you wish to delete this item?"
                        ) && deleteItem(item.id)
                    }><span role="img" aria-label="delete" className="emoji">❌</span>
                </Button>
            </div>
            </div>
        </>
    )
}