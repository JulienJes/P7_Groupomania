import React from 'react';
import { NavLink } from 'react-router-dom';

function LeftNav() {
    return(
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink exact="true" to='/' activeclassname="active-left-nav">
                        <img src='./img/icons/home.svg' alt="Fil d'actualité"/>
                    </NavLink>
                    {/*<br/>
                    <NavLink exact="true" to='/trending' activeclassname="active-left-nav">
                        <img src='./img/icons/rocket.svg' alt="Tendances"/>
                    </NavLink>*/}
                    <br/>
                    <NavLink exact="true" to='/profil' activeclassname="active-left-nav">
                        <img src='./img/icons/user.svg' alt="Profil"/>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftNav;