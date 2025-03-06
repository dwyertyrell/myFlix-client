

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit= (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      age: age,
      birthday: birthday,
      firstName: firstName,
      lastName: lastName
    }

    fetch('signup_url', 
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

        <form onSubmit={handleSubmit}>

        <label>
          username: 
          <input
            type= 'text'
            value= {username}
            onChange = {(e)=>setUsername(e.target.value)}
            required
            minlength='3'
          ></input>
        </label>

        <label>
          first Name: 
          <input
          type= 'text'
          value= {firstName}
          onChange = {(e)=>setFirstName(e.target.value)}
          required
          ></input>
        </label>

        <label>
          last name: 
          <input
          type= 'text'
          value= {lastName}
          onChange = {(e)=>setLastName(e.target.value)}
          required
          ></input>
        </label>

        <label>
          password: 
          <input
            type= 'text'
            value= {password}
            onChange = {(e)=>setPassword(e.target.value)}
            required
          ></input>
        </label>

        <label>
          email: 
          <input
          type= 'email'
          value= {email}
          onChange = {(e)=>setEmail(e.target.value)}
          required
          ></input>
        </label>

        <label>
          age: 
          <input
          type= 'number'
          value= {age}
          onChange = {(e)=>setAge(e.target.value)}
          required></input>
        </label>

        <label>
          birthday: 
          <input
          type= 'date'
          value= {birthday}
          onChange = {(e)=>setBirthday(e.target.value)}
          required></input>
        </label>

        <button type="submit">sign up!</button>

      </form>
        </>
    )
}

/*the handleSubmit needs to make an API call to the signup URL passing the 
form data. there isn't an endpoint for '/signup' in the API, therefore this 
functionality will not work now.  */