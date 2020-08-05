import React, { useContext, useEffect } from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { ItemContext } from '../../providers/ItemProvider';
import { RoomContext } from '../../providers/RoomProvider';
import { Item } from '../items/Item';
import './Room.css';

export const StockRoom = () => {
    const { items, getItemsByRoom } = useContext(ItemContext)
    const { setCurrentRoomView } = useContext(RoomContext)

    useEffect(() => {
        setCurrentRoomView({ id: 0 })
        getItemsByRoom(0)
        // eslint-disable-next-line   
    }, [])

    return (
        <>
            <section className="roomContainer">
                <section className="itemContainer">
                    {(items.length > 0) && (
                        <>
                            {items.map(i => {
                                return <Item key={i.id} value={i.id} item={i} />
                            })}
                        </>
                    )}
                </section>
            </section>
            <div className="roomBtns">
                <div className="header--roomName">Stock Room</div>
                <div className="header--roomMenu">Menu:</div>
                <NavLink to={`/stockRoom/addItem`}>
                    <Button className="btn--roomMenu white">
                        <span role="img" aria-label="plus">➕</span>
                    </Button>
                </NavLink>
            </div>
        </>
    )
}