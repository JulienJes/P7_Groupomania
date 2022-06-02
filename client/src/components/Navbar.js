import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext"
import Logout from "./Log/Logout";


function Navbar() {
    const uid = useContext(UidContext);
    return(
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon.png" alt="Logo Groupomania"/>
                            <h3>Groupomania</h3>
                        </div>
                    </NavLink>
                </div>                
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome"></li>
                        <NavLink exact to="/profil">
                            <h5>Bienvenue "valeur dynamique"</h5>
                        </NavLink>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <NavLink exact to="/profil">
                            <img src=".img/icons/login.svg" alt="Login"/>
                        </NavLink>
                    </ul>
                )}
            </div>
        </nav>
    )
};

export default Navbar;