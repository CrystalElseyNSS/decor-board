import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { RoomForm } from '../rooms/RoomForm';
import { Room } from '../rooms/Room';
import { EditRoomForm } from '../rooms/EditRoomForm'; 
import { AddItemForm } from '../items/AddItemForm';

export const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext)

  return (

      <section className="viewContainer">
        <Switch>

          <Route path="/" exact>
            {isLoggedIn ? <p>Welcome!</p> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/design">
            {isLoggedIn ? <RoomForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/room/editRoom/:id">
            {isLoggedIn ? <EditRoomForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/room/room/:id" exact>
            {isLoggedIn ? <Room /> : <Redirect to="/login" />}
          </Route>

          <Route path="/addItem">
            {isLoggedIn ? <AddItemForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/stockRoom">
            {isLoggedIn ? <Room /> : <Redirect to="/login" />}
          </Route>

        </Switch>
      </section>

  )
}