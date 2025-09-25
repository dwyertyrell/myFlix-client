import {useState} from 'react';
import './login-view.scss'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
const apiUrl = process.env.REACT_APP_API_URL

export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');

    const handleSubmit= (event) => {
        event.preventDefault();
        
        const data = {
            username: username,
            password: password
        };
        fetch(`${apiUrl}/login`,
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
                    // stringified the 'user' data
                    localStorage.setItem('user', JSON.stringify(data.user));
                    console.log('the local storage been updated:', localStorage.getItem('user'));
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

    const navigate = useNavigate();



    return ( 
        <>
        <div>
            <h1 className='app-logo'>myFlix</h1>
        </div>
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

                <Button className='login-button' variant= 'primary' onClick={handleSubmit}>Login</Button>
            </Form>

            <Button className='signUp-button' onClick={()=> {navigate('/signup')}}>sign up here</Button>



        </>

        
    )
}


LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
  };
