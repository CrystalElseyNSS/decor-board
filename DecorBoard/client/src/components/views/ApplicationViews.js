import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { RoomForm } from '../rooms/RoomForm';
import { Room } from '../rooms/Room';

export const ApplicationViews = (props) => {
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
            {isLoggedIn ? <Register /> : <Redirect to="/login" />}
          </Route>

          <Route path="/design">
            {isLoggedIn ? <RoomForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/room/room/:id" exact>
            {isLoggedIn ? <Room {...props}/> : <Redirect to="/login" />}
          </Route>

          <Route path="/stockRoom">
            {isLoggedIn ? <Room /> : <Redirect to="/login" />}
          </Route>

        </Switch>
      </section>

  )
}