import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const navigate = useNavigate();

  const handleSubmit= (event) => {
    event.preventDefault();

// the value of the input field is added the data object upon submit event
    const data = {
      username: username,
      password: password,
      email: email,
      age: age,
      birthday: birthday,
      firstName: firstName,
      lastName: lastName
    }
// this fetch is called inside the onSubmit handler 
    fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users', 
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    }).then((response) => {
      if (response.ok) {
        alert('signup successful');
        /*causing the Reapp to be forcibly reloaded. 
        window.location refers to the current url of the browser window.*/
        window.location.reload();       
      } else {
        alert('sign up failed')
      }
    }).catch((e) => {
      console.error('posting sign up request failed');
    })


  }


    return (
      <>
    
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>
            username:
          </Form.Label> 

            <Form.Control
                type= 'text'
                value= {username}
                onChange = {(e)=>setUsername(e.target.value)}
                // required
                // minlength='3'
                >
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>
              first Name:
            </Form.Label> 
            <Form.Control
              type= 'text'
              value= {firstName}
              onChange = {(e)=>setFirstName(e.target.value)}
              // required
              >
            </Form.Control> 
          </Form.Group>
      
        <Form.Group>

            <Form.Label>
                last name: 
            </Form.Label>
            <Form.Control
                type= 'text'
                value= {lastName}
                onChange = {(e)=>setLastName(e.target.value)}
                // required
                >
            </Form.Control>
        </Form.Group>


        <Form.Group>
          <Form.Label>
              password:
          </Form.Label> 
          <Form.Control
              type= 'password'
              value= {password}
              onChange = {(e)=>setPassword(e.target.value)}
              // required
              >
          </Form.Control>
        </Form.Group>

        <Form.Group>

            <Form.Label>
                email:
            </Form.Label> 
            <Form.Control
                type= 'email'
                value= {email}
                onChange = {(e)=>setEmail(e.target.value)}
                // required
                >
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>
                age: 
            </Form.Label>
            <Form.Control
                type= 'number'
                value= {age}
                onChange = {(e)=>setAge(e.target.value)}
                // required
                >
              </Form.Control>        
        </Form.Group>

        <Form.Group>
            <Form.Label>
                birthday: 
            </Form.Label>
            <Form.Control
              type= 'date'
              value= {birthday}
              onChange = {(e)=>setBirthday(e.target.value)}
              // required
              >
              </Form.Control>    
        </Form.Group>

        <Button type="submit" variant='primary'>sign up!</Button>
        <Button  onClick={()=> navigate('/login')} variant='primary'>Log in over here</Button>

    </Form>
      </>
    )
}

