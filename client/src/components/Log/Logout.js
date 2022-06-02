import axios from "axios";
import cookie from "js-cookie"; //normalement pas besoin car cookie retiré en back, mais pour être sûr on le fait en front aussi

function Logout() {
    
    const removeCookie = (key) => {
        if(window !== "undefined"){
            cookie.remove(key, { expires: 1 })
        }
    }
    
    const logout = async() => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
        .then(() => removeCookie('jwt'))
        .catch((error) => console.log(error))

        window.location = "/";
    }

    return(
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="Logout"/>
        </li>
    )
}


export default Logout;