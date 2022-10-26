import axios from 'axios';
import {useState} from 'react';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
        .then((res) =>{
            if(res.data.errors) {
                
            } else {
                window.location = '/';
            }
        })
        .catch((error) => {
            console.log(error);
                emailError.innerHTML = error.response.data.errors.email;
                passwordError.innerHTML = error.response.data.errors.password;
        })
    }

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label> {/*htmlFor est l'équivalent React de for en JS*/}
            <br/>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <div className="email error"></div>
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div className="password error"></div>
            <br/>
            <input type="submit" value="Se connecter"/>
        </form>
    )
}

export default SignInForm