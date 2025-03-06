import {useState} from 'react';
import {SignupView} from '../signup-view/signup-view'

export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');

    const handleSubmit= (event) => {
        event.preventDefault();
        
        const data = {
            username: username,
            password: password
        };
        fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/login',
            {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("login response: ", data.user, data.token);
                if(data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    onLoggedIn(data.user, data.token);
                    alert('SUCCESS!')
                } else {
                    alert("No Such User");
                }
            }).catch((e) => {
                alert("something went wrong here");
            })      

    }
    
    // const handleSignup = () => {
    //     return <SignupView/>
    // }
    
    return (
        <form onSubmit= {handleSubmit}>
            <label>
                username:
                <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}></input>
            </label>
            <label>
                password:
                <input
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <button>submit</button>
            {/* <button onClick= {handleSignup}>create an account </button> */}
        </form>
    )
}
