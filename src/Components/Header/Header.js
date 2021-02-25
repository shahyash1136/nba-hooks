import React from 'react';
import './Header.scss'
import { NavLink } from 'react-router-dom'
const header = (props) => {
    return (
        <header>
            <div className="header">
                <div className="main__container">
                    <div className="header__container">
                        <div className="header__left">
                            <NavLink to="/" exact>
                                <img src={require('../../assets/images/logo.png').default} alt="" />
                            </NavLink>
                        </div>
                        <div className="header__right">
                            <ul>
                                <li><NavLink to="/" exact>Home</NavLink></li>
                                <li><NavLink to="/teams">Teams</NavLink></li>
                                <li><NavLink to="/players">Players</NavLink></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default header