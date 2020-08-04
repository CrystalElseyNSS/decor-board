import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { AddRoomForm } from '../rooms/AddRoomForm';
import { Room } from '../rooms/Room';
import { EditRoomForm } from '../rooms/EditRoomForm'; 
import { AddItemForm } from '../items/AddItemForm';
import { EditItemForm } from '../items/EditItemForm';
import { StockRoom } from '../rooms/StockRoom';
import { StockItemForm } from '../items/StockItemForm';
import '../views/Layout.css'

export const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext)

  return (

      <section className="viewContainer">
        <Switch>

          <Route path="/" exact>
            {isLoggedIn ? <p className="welcome">Welcome!</p> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/design">
            {isLoggedIn ? <AddRoomForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/room/editRoom/:id">
            {isLoggedIn ? <EditRoomForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/room/room/:id" exact>
            {isLoggedIn ? <Room /> : <Redirect to="/login" />}
          </Route>

          <Route path="/addItem/:id">
            {isLoggedIn ? <AddItemForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/stockRoom/addItem">
            {isLoggedIn ? <StockItemForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/room/editItem/:id">
            {isLoggedIn ? <EditItemForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/stockRoom">
            {isLoggedIn ? <StockRoom /> : <Redirect to="/login" />}
          </Route>

        </Switch>
      </section>

  )
}