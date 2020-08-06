import React, { useContext, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useParams, NavLink } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import { ItemContext } from '../../providers/ItemProvider';
import { Item } from '../items/Item';
import './Room.css';

export const Room = () => {

    const { currentRoomView, getRoomById, deleteRoom } = useContext(RoomContext)
    const { items, getItemsByRoom, itemTotal, getItemTotal } = useContext(ItemContext)
    const { id } = useParams()

    useEffect(() => {
        getRoomById(id)
        .then(() => getItemTotal(id))
        // eslint-disable-next-line   
    }, [])

    useEffect(() => {
        getItemTotal(currentRoomView.id)
    }, [items])

    useEffect(() => {
        getItemsByRoom(currentRoomView.id)
        .then(() => getItemTotal(currentRoomView.id))
        // eslint-disable-next-line   
    }, [currentRoomView])

    console.log(currentRoomView.id)

    return (
        <>
            <section className="roomContainer" style={{ backgroundImage: `url(/uploads/` + currentRoomView.imageLocation + `)` }}>
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
                <div className="header--roomName">{currentRoomView.roomName}</div>
                <div className="header--roomMenu">Menu:</div>
                <NavLink to={`/addItem/${currentRoomView.id}`}>
                    <Button className="btn--roomMenu white">
                        <span role="img" aria-label="plus">➕</span>
                    </Button>
                </NavLink>
                <NavLink to={`/room/editRoom/${currentRoomView.id}`}>
                    <Button className="btn--roomMenu white">
                        <span role="img" aria-label="write">📝</span>
                    </Button>
                </NavLink>
                <Button 
                    className="btn--roomMenu white"
                    onClick={() =>
                        window.confirm(
                          "Are you sure you wish to delete this board?"
                        ) && deleteRoom(currentRoomView.id)
                      }><span role="img" aria-label="delete">❌</span>
                </Button>
                <div className="roomBudget">
                    <div>Total Price:</div>
                    <div className="roomTotal">${itemTotal.sumOfRoomItems}</div>
                </div>
            </div>
        </>
    )
}