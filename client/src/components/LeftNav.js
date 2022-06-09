import React from 'react';
import { NavLink } from 'react-router-dom';

function LeftNav() {
    return(
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink to='/' exact activeClassName="active-left-nav"> {/* activeClassName permet de donner une classe à un élément QUE lorsque celui ci est actif}*/}
                        <img src='.img/icons/home.svg' alt="Fil d'actualité"/>
                    </NavLink>
                    <br/>
                    <NavLink to='/trending' exact activeClassName="active-left-nav"> {/* activeClassName permet de donner une classe à un élément QUE lorsque celui ci est actif}*/}
                        <img src='.img/icons/rocket.svg' alt="Tendances"/>
                    </NavLink>
                    <br/>
                    <NavLink to='/profil' exact activeClassName="active-left-nav"> {/* activeClassName permet de donner une classe à un élément QUE lorsque celui ci est actif}*/}
                        <img src='.img/icons/user.svg' alt="Profil"/>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftNav;