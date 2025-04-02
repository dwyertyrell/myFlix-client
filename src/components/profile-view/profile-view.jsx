import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Alert, Spinner} from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

export const ProfileView = ({ user, token, moviesFromApi, onProfileUpdate, onLogout}) => {

const [profile, setProfile] = useState({});
const [editing, setEditing] = useState(false);
const [newInfo, setNewInfo] = useState({
    username: '',
    email: '', 
    birthday: '',
    password:'',
});
const [confirmPassword, setConfirmPassword] = useState('');
const [favouriteMovies, setFavouriteMovies] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

// const formatDate = (dateString) => {
//     if(!dateString) return 'not provided';
//     return dateString.toLocaleDateString('en-GB', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//     });
// }

const formatDate = (dateString) => {
    if(!dateString) return 'not provided';
    return (new Date(dateString)).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // i want the favouriteMovies state to be updated continuously. don't need this code...
// useEffect(() => {
//     if (user) {
//         setFavouriteMovies(user.favouriteMovies);
//     }
// },[user, favouriteMovies])


    //fetch user profile and favourites

useEffect(()=> {
    const  fetchProfile = async () => {
        if (!user || !token) {
            setError('user or token is missing. please log in again.');
            console('user/token missing')
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await fetch(
                `https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${user.username}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    console.log('!response.ok');
                    throw new Error('failed to fetch profile.');
                    
                }

                const data = await response.json();
                const fetchedUser = data;
// the fetched data is set to both the profile and newInfo state.
                setProfile(fetchedUser);
                if (!profile) {
                    console.log('fetched data has not been added to profile state')
                }
                setNewInfo({
                    username: fetchedUser.username,
                    email: fetchedUser.email,
                    birthday: fetchedUser.birthday || '',
                    password: ''
                });

                if(!newInfo) {
                    console.log('fetched data has not been added to newInfo state')
                }

                //populate favouriteMovies
                // cross referencing the movie list from movies state and user's favourite list on api
                //if cross reference is correct, then put the movie object from the movie state into the favourite movie array- this means we can use the movie.image from the api as well!
                if (moviesFromApi && fetchedUser.favouriteMovies) {
                    const favouriteMoviesList = moviesFromApi.filter((movie)=>{
                        return fetchedUser.favouriteMovies.includes(movie.id);
                    }
                )
                setFavouriteMovies(favouriteMoviesList);
                }

                
        } catch(error) {
            setError(error.message);
        } finally{
            setLoading(false)
        }

};
fetchProfile();
},[moviesFromApi, user, token]);

const handleProfileUpdate = async (e) => {
    e.preventDefault();

    // add validation logic here

    setError(null);
    setLoading(true);

    const updatedData = {
        username: newInfo.username,
        email: newInfo.email,
        birthday: newInfo.birthday,
        password: newInfo.password
    }

    // PUT request to upload the user's profile.
    try {
        const response = await fetch(
            `https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${profile.username}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                // why create a new object called updatedData instead of using 
                // newInfo object?
                body: JSON.stringify(updatedData)
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            // why create a new Error function, and what does it mean?
            throw new Error(errorData.message || 'failed to update profile')
        }

        const updatedUser = await response.json();
        setProfile(updatedUser);
        // again, why are we updating newInfo like this?
        setNewInfo({
            username: updatedUser.username,
            email: updatedUser.email,
            birhtday: updatedUser.birthday,
            password: ''
        });
        setEditing(false)
        onProfileUpdate(updatedUser); //update the parent component
        alert('profile update successfully'); 
    } catch(error) {
        setError(error.message) //what are the properties of the error object.
    } finally {
        setLoading(false);
    }
};


// delete is not working
const deleteAccount = () => {
    if (!token) {
        alert('token is not found');
        return;
    }
    if (window.confirm('Are you sure you want to delete your account? this action cannot be undone')) {
        setLoading(true);
        setError(null);
        fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${profile.username}`, 
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if(!response.ok) {
                    return response.json().then((errData) => {
                        // what is this Error() function? 
                        throw new Error(errData.message || 'failed to delete account');
                    });
                };

                if (response.status === 202 ) {
                    return null; 
                }
                return response.json();
            }).then(() => {
                setLoading(false);
                onLogout();
                navigate('/signup');
                alert('Account delete successfully!');
            }).catch((error) => {
                setLoading(false);
                // is the error object from the promise function? 
                setError(error.message)
            });
    }   
}

const handlelogout = () => {
    onLogout();
    navigate('/login');
};

return (
    <>
    <h1>user's profile</h1>
    
    {error && <Alert variant='danger'>{error}</Alert>}

    {loading && <Spinner animation='border' variant='primary'></Spinner>}

    {!editing ? (
        //user profile
        <>
        <div>
            <p> username: {profile.username}</p>
            <p> email: {profile.email}</p>
            <p> birthday: {formatDate(profile.birthday)}</p>
        </div>
        <div>
            <Button onClick={()=> setEditing(true)}>Edit profile</Button>
            <Button onClick={deleteAccount}>delete account</Button>
            <Button onClick={handlelogout}>log out</Button>
        </div>
        </>
    ): (
        //user profile edit
        <Form onSubmit={handleProfileUpdate}>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                type='text'
                placeholder='enter your username'
// the newInfo state is consistently updated after each request, as well each 
// onChange event- this maintains the synchronicity of the user's profile after
//each fetch/ or event.
                value={newInfo.username}
//create a new newInfo object and spread the existing object inside of it 
                onChange={(e) => setNewInfo( {...newInfo, username: e.target.value})}
                />
            </Form.Group>

            <Form.Group controlId='forEmail'>
                <Form.Label>email</Form.Label>
                <Form.Control
                type='type'
                placeholder='enter the email'
                value={newInfo.email}
                onChange={(e)=> setNewInfo({...newInfo, email: e.target.value})}
                />
            </Form.Group>

            <Form.Group controlId='formBirthday'>
                <Form.Label>birthday</Form.Label>
                <Form.Control 
                type='date'
                placeholder='enter your birthday'
                value={ newInfo.birthday.split('T')[0] }
                onChange={(e)=> setNewInfo({...newInfo, birthday: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId='formNewPassword'>
                <Form.Label>New Password</Form.Label>
                <Form.Control 
                type='password'
                placeholder='enter new password'
                minLength= {3}
                value={newInfo.password}
                onChange={(e) => setNewInfo({...newInfo, password: e.target.value})}
                autoComplete='new-password' // what is this attribute?
                />
                <Form.Text>this password must be at least 3 characters long
                </Form.Text> 

            </Form.Group>

            <Form.Group controlId = 'formConfirmNewPassword'>
                <Form.Label>Confirm New password</Form.Label>
                <Form.Control
                type='password'
                placeholder='confirm new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='off'
                />
            </Form.Group>

            <Button type='submit'> 
                save changes
            </Button>
            <Button onClick={() => setEditing(false)}> cancel</Button>
        </Form>
    )}

        <>
            <h3> your favourite movies:</h3>
           
            {loading ? (
                <Spinner animation='border' variant='primary'></Spinner> //bootstrap spinner
            ) : (
                favouriteMovies.length > 0 ? (
                    
                    favouriteMovies.map((movie) => (
                        <div key={movie.id}> 
                           
                                
                                    <img 
                                        src={movie.image} //the chaining operator is important because it returns undefined rather than error- this prevents the application from crashing.
                                        alt={movie.title}
                                        loading='lazy'
                                        style={{ width: '200px', height: 'auto' }}
                                    />
                              
                                    <a href={`/movies/${movie.id}`}>{movie.title}</a> 
                          
                        </div>
                    ))
                    
                ) : (
                    <p>You have no favourite movies yet. Add some from the movie list!</p>
                )
            )}


        </>

    </>


); 







}















































































// /*the functionality of updating profile is not working. 
// how is localStorage affected? is the mongoose atlas updated afterwards?

// i commented the birthday logic in case it is the problem.*/
// const [username, setUsername] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// // const [birthday, setBirthday] = useState('');

// const [isEditing, setIsEditing] = useState(false);
// // const navigate = useNavigate();

// const formDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', 
//         {
//             year: 'numeric', month: 'long', day: 'numeric'
//         });
// }

// useEffect(()=>{
//     if (user) {
//         setUsername(user.username || '');
//         setEmail(user.email || '');
//         setPassword(user.username || '');
//         // setBirthday(user.birthday || '');
//     }
// }, [user]);

// // flip the boolean value for the conditional rendering 
// const handleEditToggle = () => {
//     setIsEditing(!isEditing);
// };
// // an onChange event can only happen in one input field at any given time
// const handleInputChange = (e) => {
//     const {name, value} = e.target;
//     switch (name) {
//         case 'username':
//             setUsername(value);
//             break;
//         case 'email':
//             setEmail(value);
//             break;
//         // case 'birthday':
//         //     setBirthday(value);
//         //     break;
//         case 'password':
//             setPassword(value);
//             break;
//         default:
//             break;
//     }
// };

// const handleUpdateProfile = async (e) =>{
//     e.preventDefault();

//     if (!token || !user) {
//         console.log('not authenticated or user data is missing ');
//         // the empty return statement is used to exit the entire function 
//         return; 
//     }
    
// const updatedUserData = {
//     username: username,
//     email: email,
//     // birthday: birthday,
//     password: password
// };

// // the entire try statement is in an async function- part of handleUpdateProfile  
// try {
//         const response = await fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${username}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: JSON.stringify(updatedUserData)
//             }
//         );

//         if (response.ok) {
//             const updatedUser = await response.json();
//             alert('profile updated successfully');
//             // add setEditing to false here...
//             console.log('updated user:', updatedUser);
//             window.location.reload();
//             // setIsEditing(false);

//         } else{
//     // this will render only when !response.ok 

//             const errorData = await response.json();
//             alert(`Failed to update profile: ${errorData.message || response.statusText}`);    
//         } 
//         }catch (error) {
//             console.error('error updating profile:', error)
//         };
// };
    

    



//   return (
//     <>
//         <h2>User's Profile</h2>
//         {isEditing ? (
//             <Form onSubmit={handleUpdateProfile}>
//                 <Form.Group controlId='formUsername'>
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                         type= 'text'
//                         name='username'
//                         value={username}
//                         onChange={handleInputChange}
//                         placeholder='enter new username'
//                         />

//                 </Form.Group>
//                 <Form.Group controlId='formEmail'>
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                         type= 'email'
//                         name='email'
//                         value={email}
//                         onChange={handleInputChange}
//                         placeholder='enter new email'
//                         />

//                 </Form.Group>
//                 <Form.Group controlId='formPassword'>
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type= 'text'
//                         name='password'
//                         value={password}
//                         onChange={handleInputChange}
//                         placeholder='enter new password'
//                         />
//                 </Form.Group>

//                 {/* <Form.Group controlId='formBirthday'>
//                     <Form.Label>Birthday</Form.Label>
//                     <Form.Control
//                         type= 'date'
//                         name='birthday'
//                         value={birthday}
//                         onChange={handleInputChange}
//                         />
//                 </Form.Group> */}
//                 <Button type='submit'>save changes</Button>
//                 <Button onClick={handleEditToggle}>Cancel</Button>
//                 <Button onClick={handleEditToggle}>back to User's Profile</Button>

//             </Form>
//         ) :(
//             <div>
        
//             { user && (
//                 <>
//                     <p>username: {user.username}</p>
//                     <p> First Name: {user.firstName}</p>
//                     <p> Last Name: {user.lastName}</p>
//                     <p> Age: {user.age}</p>
//                     <p> password: {user.password}</p>
//                     <p> birthday: {user.birthday ? formDate(user.birthday) : 'not provided'}</p>
//                     <p> Email: {user.email}</p>
//                     <p> favourite movies: {user.favouriteMovies}</p>
//                     <Button onClick={handleEditToggle} variant='primary'>Edit profile</Button>

//                     <h2>profile infomation</h2>

//                     {user.favouriteMovies && user.favouriteMovies.length > 0 
//                         &&
//                         <>
//                             <h3>favourite movies</h3>

//                             <div>{ user.favouriteMovies.map((movie)=> {
//                             const found= moviesFromApi.find((m)=> m.id === movie) 
//                             if (found){
//                             return (
//                                 <p key={found.id} >{found.title}</p>
//                             )
//                             }
//                             // this error handling is important- as it take a while to fetch movie data, after the page is being rendered or reloaded.
//                             return <p key={movie}>cannot find movies in user's favourite</p>;
//                             })}
//                             </div>
//                         </> 
//                         }
//                 </> 
//                 )}       
//             </div>
//             )}
            
         
    
//     </>
//     )







    


