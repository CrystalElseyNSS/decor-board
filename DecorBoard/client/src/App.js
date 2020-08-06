// React imports: 
import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// Component imports: 
import { UserProfileContext } from './providers/UserProfileProvider';
import { Header } from './components/views/Header';
import { NavBar } from './components/nav/NavBar';
import { ApplicationViews } from './components/views/ApplicationViews';
// Design import:
import './components/views/Layout.css';

export const App = () => {
  const { isLoggedIn } = useContext(UserProfileContext)

  return (
    <div id="override">
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