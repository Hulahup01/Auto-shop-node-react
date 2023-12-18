import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import '../styles/Auth.css'
import { NavLink, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <div className="auth-container">
            <form action="#" id="login-form">
                <div className="heading">{isLogin ? 'Login to AUTO-SHOP' : 'Register to AUTO-SHOP'}</div>
                <div className="left">
                    <label htmlFor="email">Email</label> <br />
                    <input type="email" name="email" id="email" /> <br />
                    <label htmlFor="password">Password</label> <br />
                    <input type="password" name="password" id="pass" /> <br />
                    <button type="submit">{isLogin ? 'Login' : 'Sign up'}</button>
                    {isLogin ?
                        <div>
                        For the first time?
                        <NavLink to={REGISTRATION_ROUTE}>  sign up</NavLink>
                        </div>
                        :
                        <div>
                        Have account?
                        <NavLink to={LOGIN_ROUTE}>  log in</NavLink>
                        </div>
                    }
                  
                </div>
                <div className="right">
                    <div className="connect">Connect with</div>
                    <a href="" className="facebook">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a> <br />
                    <a href="" className="twitter">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a> <br />
                    <a href="" className="google-plus">
                        <FontAwesomeIcon icon={faGooglePlusG} />
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Auth;