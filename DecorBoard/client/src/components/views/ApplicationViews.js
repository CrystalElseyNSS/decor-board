import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { RoomForm } from '../rooms/RoomForm';
import { Room } from '../rooms/Room';

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
            <RoomForm />
          </Route>

          <Route path="/room">
            <Room />
          </Route>

        </Switch>
      </section>

  )
}