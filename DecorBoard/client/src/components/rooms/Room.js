import React, { useContext, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useParams, NavLink } from 'react-router-dom'
import { RoomContext } from '../../providers/RoomProvider';
import { ItemContext } from '../../providers/ItemProvider';
import { Item } from '../items/Item';
import './Room.css';

export const Room = () => {

    // Gets room id from route parameter and sets application view to the clicked room:
    const { currentRoomView, getRoomById, deleteRoom } = useContext(RoomContext)
    const { items, getItemsByRoom } = useContext(ItemContext)
    const { id } = useParams()

    useEffect(() => {
        getRoomById(id)
        // eslint-disable-next-line   
    }, [])

    useEffect(() => {
        getItemsByRoom(currentRoomView.id)
        // eslint-disable-next-line   
    }, [currentRoomView])
    
    // Renders JSX code for room model: 
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
                <div>Total Price:</div>
            </div>












        </>
    )
}