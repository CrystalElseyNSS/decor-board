import React, { useContext, useEffect } from 'react';
// React imports: 
import { Button } from 'reactstrap';
import { useParams, NavLink, useHistory } from 'react-router-dom';
// Component imports:
import { RoomContext } from '../../providers/RoomProvider';
import { ItemContext } from '../../providers/ItemProvider';
import { Item } from '../items/Item';
// Design import:
import './Room.css';

export const Room = () => {

    const { items, getItemsByRoom, itemTotal, getItemTotal } = useContext(ItemContext)
    const { currentRoomView, getRoomById, deleteRoom } = useContext(RoomContext)
    const history = useHistory()

    // Gets room id from route parameter, sets currentRoomView (in provider), and renders room budget total:
    const { id } = useParams()
    useEffect(() => {
        getRoomById(id)
        .then(() => getItemTotal(id))
        // eslint-disable-next-line   
    }, [])

    // Once CurrentRoomView is set, fetches that room's items, and renders room budget total:
    useEffect(() => {
        getItemsByRoom(currentRoomView.id)
        .then(() => getItemTotal(currentRoomView.id))
        // eslint-disable-next-line   
    }, [currentRoomView])

    // Re-renders room budget total whenever an item is added or deleted:
    useEffect(() => {
        getItemTotal(currentRoomView.id)
    }, [items])

    // Renders JSX of Room component in the ApplicationView:
    return (
        <>
            <section 
                className="roomContainer" 
                // Sets user-uploaded image as background image for room:
                style={{ backgroundImage: `url(/uploads/` + currentRoomView.imageLocation + `)` }}
            >
                <section className="itemContainer">
                    {/* Maps through items array and renders on Room board by roomId: */}
                    {(items.length > 0) && (
                        <>
                            {items.map(i => {
                                return <Item key={i.id} value={i.id} item={i} />
                            })}
                        </>
                    )}
                </section>
            </section>

            {/* Renders room menu buttons for addItem, EditBoard, DeleteBoard: */}
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
                        ) && 
                        deleteRoom(currentRoomView.id)
                        .then(() => history.push("/"))
                      }><span role="img" aria-label="delete">❌</span>
                </Button>

                {/* Fetches room budget total (calculated server-side) and renders on Room board: */}
                <div className="roomBudget">
                    <div>Total Cost:</div>
                    <div className="roomTotal">${itemTotal.sumOfRoomItems}</div>
                </div>
            </div>
        </>
    )
}