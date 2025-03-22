import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import { useParams } from 'react-router';
/*passing the user state over here, to access user.username during the 
filtering   */
export const ProfileView = ({token, user}) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const {username} = useParams()
    
    useEffect(
    fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/:username',

        {
            headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => response.json())
        .then((data) => {
              const theUser = data.find((u) => u.username === user.username);
              if(theUser) {
                username = theUser.username;
                setLoggedInUser(theUser);
              }else {
                setLoggedInUser(null);
              }

            }) .catch((err) => {
            console.error(err, 'fetching failed')
        })
    ,[token])


        return (
            <>
                {loggedInUser ? (
                <Container>
                    <h2>profile Infomation</h2>

                        <p> First Name: {loggedInUser.firstName}</p>
                        <p> Last Name: {loggedInUser.lastName}</p>
                        <p> Age: {loggedInUser.age}</p>
                        <p> username: {loggedInUser.username}</p>
                        <p> password: {loggedInUser.password}</p>
                        <p> birthday: {loggedInUser.birthday}</p>
                        <p> Email: {loggedInUser.email}</p>
                        <ul>
                            { loggedInUser.favouriteMovies && loggedInUser.favouriteMovies.length > 0
                            && (
                                <>
                                    <h3> Favourite Movies: </h3>
                                    <p>{loggedInUser.favouriteMovies.map((movies) => {
                                        <li key={movies._id}>{movies.title}</li>
                                        })
                                        }
                                    </p>
                                </>
                            )}
                        </ul>       
                </Container>
                ) : (
                    <p>user not found</p>
                    )
                }
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