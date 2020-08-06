import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import './Layout.css';

export const Header = () => {
    const { logout, isLoggedIn } = useContext(UserProfileContext)

    return (
        <>
        
            <header className="headerContainer">
                <div className="logo"></div>
            </header>
        </>
    )
}