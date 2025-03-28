import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

export const ProfileView = ({ user, token, moviesFromApi}) => {
/*the functionality of updating profile is not working. 
how is localStorage affected? is the mongoose atlas updated afterwards?

i commented the birthday logic in case it is the problem.*/
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
// const [birthday, setBirthday] = useState('');

const [isEditing, setIsEditing] = useState(false);
// const navigate = useNavigate();

const formDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', 
        {
            year: 'numeric', month: 'long', day: 'numeric'
        });
}

useEffect(()=>{
    if (user) {
        setUsername(user.username || '');
        setEmail(user.email || '');
        setPassword(user.username || '');
        // setBirthday(user.birthday || '');
    }
}, [user]);

// flip the boolean value for the conditional rendering 
const handleEditToggle = () => {
    setIsEditing(!isEditing);
};
// an onChange event can only happen in one input field at any given time
const handleInputChange = (e) => {
    const {name, value} = e.target;
    switch (name) {
        case 'username':
            setUsername(value);
            break;
        case 'email':
            setEmail(value);
            break;
        // case 'birthday':
        //     setBirthday(value);
        //     break;
        case 'password':
            setPassword(value);
            break;
        default:
            break;
    }
};

const handleUpdateProfile = async (e) =>{
    e.preventDefault();

    if (!token || !user) {
        console.log('not authenticated or user data is missing ');
        // the empty return statement is used to exit the entire function 
        return; 
    }
    
const updatedUserData = {
    username: username,
    email: email,
    // birthday: birthday,
    password: password
};

// the entire try statement is in an async function- part of handleUpdateProfile  
try {
        const response = await fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${username}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedUserData)
            }
        );

        if (response.ok) {
            const updatedUser = await response.json();
            alert('profile updated successfully');
            // add setEditing to false here...
            console.log('updated user:', updatedUser);
            window.location.reload();
            // setIsEditing(false);

        } else{
    // this will render only when !response.ok 

            const errorData = await response.json();
            alert(`Failed to update profile: ${errorData.message || response.statusText}`);    
        } 
        }catch (error) {
            console.error('error updating profile:', error)
        };
};
    

    



  return (
    <>
        <h2>User's Profile</h2>
        {isEditing ? (
            <Form onSubmit={handleUpdateProfile}>
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type= 'text'
                        name='username'
                        value={username}
                        onChange={handleInputChange}
                        placeholder='enter new username'
                        />

                </Form.Group>
                <Form.Group controlId='formEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type= 'email'
                        name='email'
                        value={email}
                        onChange={handleInputChange}
                        placeholder='enter new email'
                        />

                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type= 'text'
                        name='password'
                        value={password}
                        onChange={handleInputChange}
                        placeholder='enter new password'
                        />
                </Form.Group>

                {/* <Form.Group controlId='formBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type= 'date'
                        name='birthday'
                        value={birthday}
                        onChange={handleInputChange}
                        />
                </Form.Group> */}
                <Button type='submit'>save changes</Button>
                <Button onClick={handleEditToggle}>Cancel</Button>
                <Button onClick={handleEditToggle}>back to User's Profile</Button>

            </Form>
        ) :(
            <div>
        
            { user && (
                <>
                    <p>username: {user.username}</p>
                    <p> First Name: {user.firstName}</p>
                    <p> Last Name: {user.lastName}</p>
                    <p> Age: {user.age}</p>
                    <p> password: {user.password}</p>
                    <p> birthday: {user.birthday ? formDate(user.birthday) : 'not provided'}</p>
                    <p> Email: {user.email}</p>
                    <p> favourite movies: {user.favouriteMovies}</p>
                    <Button onClick={handleEditToggle} variant='primary'>Edit profile</Button>

                    <h2>profile infomation</h2>

                    {user.favouriteMovies && user.favouriteMovies.length > 0 
                        &&
                        <>
                            <h3>favourite movies</h3>

                            <div>{ user.favouriteMovies.map((movie)=> {
                            const found= moviesFromApi.find((m)=> m.id === movie) 
                            if (found){
                            return (
                                <p key={found.id} >{found.title}</p>
                            )
                            }
                            // this error handling is important- as it take a while to fetch movie data, after the page is being rendered or reloaded.
                            return <p key={movie}>cannot find movies in user's favourite</p>;
                            })}
                            </div>
                        </> 
                        }
                </> 
                )}       
            </div>
            )}
            
         
    
    </>
    )
}






    
















    
/* managed to add the variable to the state. after fetching the array data, 
i used the find() method to find the user within that array with the same 
username as the user prop. If so, then update the loggedInUser via 
setLoggedInUser */


/*in main-view.jsx, i added the <Route path='/users/:username> tag to direct the page
 to <ProfileView/> component. 
this path, however, will be only accessible by a <Link> tag in <NavigationBar/>
component.
In this <Link> tag, i used encodeURIComponent() to give the URL path the
value of users.username. 
Now, in <ProfileView/>, i de-structured the useParams() object and assigned  
`username`  (from the path='/users/:username') as a property of that object.
i use `username` in the filtering method to find the user's username to be equal to 
it. 

this is the flow of my code so far to my understanding. however, my problem is 
 the path URL is not holding the value of the URL params, and so i think i cannot 
 complete the filtering method and compare the fetched data to it. 
 

 i notice in the `/movies/:movieId` is successfully able to pass in the movie.id
 value into its URL. 
however, the problem is the path containing the `:username` URL param is unable to have 
the user.username data passed in.  this is evident from the error in browser and 
the url being : http://localhost:1234/users/undefined 
*/

/*the user object is added upon fetching data during the POST request in 
'login-view.jsx. 
once recieved, it is added to localStorage() and would be added to the piece of state 
{users}
the {users} state is passed into the <ProfileView/> as a prop, in 'mainView.jsx' file.

i just changed my code- in the filtering, i used the strict equality directly with
 user.username . this is now directly accessing the piece of state, therefore the 
 {user} object is being used.
 then, if the filtering method finds the user, make the username property in useParms
 be equal to the username found in the filtering method. 
 please check code below. 

 
        .then((data) => {
              const theUser = data.find((u) => u.username === user.username);
              if(theUser) {
                username = theUser.username;
                setLoggedInUser(theUser);
              }else {
                setLoggedInUser(null);
              }

however, console.log is still show `TypeError: create is not a function`

 */