import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Alert, Spinner} from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

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

const formatDate = (dateString) => {
    if(!dateString) return 'not provided';
    return (new Date(dateString)).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

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

// validation logic for the new password 
if(newInfo.password !== confirmPassword) {
    setError('password do not match');
    alert('password does not match')
    return;
}
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

        let existingPassword = '';
        if(!newInfo.password){ // only fetch if new password is empty
            const profileResponse = await fetch(
                `https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${profile.username}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }

            )    
        

        if(!profileResponse.ok){
            throw new Error('failed to fetch current profile to get password');
        }
        const currentProfileData = await profileResponse.json();
        existingPassword = currentProfileData.password;
        } //this entire fetch is simply for retreving a value for existingPassword 



        const response = await fetch(
            `https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${profile.username}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({
                    ...updatedData,
                    password: newInfo.password || existingPassword, 
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'failed to update profile')
        }

        const updatedUser = await response.json();
        setProfile(updatedUser);
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

ProfileView.propTypes = {
    user: PropTypes.object.isRequired, // Define a more specific shape
    token: PropTypes.string.isRequired,
    moviesFromApi: PropTypes.arrayOf(PropTypes.object).isRequired,  // Array of movie objects
    onProfileUpdate: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  };