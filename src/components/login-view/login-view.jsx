import {useState} from 'react';

export const LoginView = (onLoggedIn) => {

    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');

    const handleSubmit= (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };
        /*if response is ok, we could pass the username into main-view.jsx, via 
        prop. then use the setter function to change users state to that value.
        piece of state is only founf on main-view.jsx, hence the need for props  */
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
                console.log("login response: ", data);
                if(data.user) {
                    /*here we are passing two parameters over 
                    to MainView using the prop*/
                    onLoggedIn(data.user, data.token);
                    alert('SUCCESS!')
                } else {
                    alert("No Such User");
                }
            }).catch((e) => {
                alert("something went wrong");
            })
      

    }
    
    
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
        </form>
    )
}
