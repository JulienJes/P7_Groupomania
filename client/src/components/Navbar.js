import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext"


function Navbar() {
    const uid = useContext(UidContext);
    console.log(uid);
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
            </div>
        </nav>
    )
};

export default Navbar();