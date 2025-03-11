import {useState} from 'react';
// import {SignupView} from '../signup-view/signup-view'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
        <Form onSubmit= {handleSubmit}>

            <Form.Group controlId='formUsername'>
                <Form.Label>username:</Form.Label>
                <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                >  
                </Form.Control>
            </Form.Group>
                        
            <Form.Group controlId='formPassword'>
                <Form.Label>password:</Form.Label>
                <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button variant= 'primary' onClick={handleSubmit}>submit</Button>
        </Form>
    )
}


/* refactor the login-view to use React Bootstrap form 
components instead of the react JSX elements. 

<Form> : replaces the container react <form></form> element
<Form.Group> : creates each of the form fields
<Form.Label> : applies your form field labels
<Form.Control> : includes the requirements for inside of the field- replacing 
                <input>

The capital letter are mandatory for react (bootstrap) components- Not for React
jsx elements.

before the React Bootstrap libray:

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
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <button {handleSubmit}>submit</button>
            // <button onClick= {handleSignup}>create an account </button> 
            </form>
        )
    }


After:
  return (
        <Form onSubmit= {handleSubmit}>

            <Form.Group controlId='formUsername'>
                <Form.Label>username:</Form.Label>
                <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                >  
                </Form.Control>
            </Form.Group>
                        
            <Form.Group controlId='formPassword'>
                <Form.Label>password:</Form.Label>
                <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button variant= 'primary' onClick={handleSubmit}>submit</Button>
        </Form>
    )
}

*/