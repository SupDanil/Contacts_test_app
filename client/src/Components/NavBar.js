import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext);

    const logoutHandler = event =>{
            event.preventDefault();
            auth.logout();
            history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper black darken-1" style={{padding: "0 2rem"}}>
                <span className="brand-logo">Список контактов</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}