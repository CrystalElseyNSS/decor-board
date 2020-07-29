// React imports: 
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// Component imports: 
import { UserProfileProvider } from './providers/UserProfileProvider';
import { RoomProvider } from './providers/RoomProvider';
import { Header } from './components/views/Header';
import { NavBar } from './components/views/NavBar';
import { ApplicationViews } from './components/views/ApplicationViews';
// Design imports:
import './components/views/Layout.css';

export const App = () => {
  return (
    <div>
      <Router>
        <UserProfileProvider>
          <RoomProvider>
          <Header />
          <main className="mainContainer">
            <NavBar />
            <ApplicationViews />
          </main>
          </RoomProvider>
        </UserProfileProvider>
      </Router>
    </div>
  )
}