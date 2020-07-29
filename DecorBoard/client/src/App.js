// React imports: 
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// Component imports: 
import { UserProfileContext } from './providers/UserProfileProvider';
import { RoomProvider } from './providers/RoomProvider';
import { Header } from './components/views/Header';
import { NavBar } from './components/views/NavBar';
import { ApplicationViews } from './components/views/ApplicationViews';
// Design imports:
import './components/views/Layout.css';

export const App = () => {
  const { isLoggedIn } = useContext(UserProfileContext)

  return (
    <div>
      <Router>
        <Header />
        <main className="mainContainer">
          {isLoggedIn ? <NavBar /> : <div></div>}
          <ApplicationViews />
        </main>
      </Router>
    </div>
  )
}