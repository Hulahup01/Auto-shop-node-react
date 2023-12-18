import React, { useContext } from 'react';
import './NavBar.css';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import logo from '../assets/autoshop_logo.png'

const NavBar = observer (() => {
    const {user} = useContext(Context)
    return (
        <div className="nav-container">
            <nav>
                <NavLink to={SHOP_ROUTE}>
                    <img className="logo" src={logo} alt="AUTO-SHOP logo"/>
                </NavLink>
                <ul>
                    <li><NavLink to={SHOP_ROUTE}>Auto parts</NavLink></li>
                    <li><a href="">Vacancies</a></li>
                    <li><a href="">Contacts</a></li>
                    <li><a href="">About us</a></li>
                </ul>

                {user.isAuth ?
                    <NavLink to={LOGIN_ROUTE} className="btn-auth" onClick={() => user.setIsAuth(false)}>Log out</NavLink>
                    :
                    <NavLink to={LOGIN_ROUTE} className="btn-auth" onClick={() => user.setIsAuth(true)}>Sign in</NavLink>
                }
            </nav>
        </div>
    );
});

export default NavBar;