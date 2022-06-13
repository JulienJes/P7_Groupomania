import { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext"
import Logout from "./Log/Logout";


function Navbar() {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return(
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact="true" to="/">
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
                        <NavLink exact="true" to="/profil">
                            <h5>Bienvenue {userData.pseudo}</h5>
                        </NavLink>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <NavLink exact="true" to="/profil">
                            <img src="./img/icons/login.svg" alt="Login"/>
                        </NavLink>
                    </ul>
                )}
            </div>
        </nav>
    )
};

export default Navbar;