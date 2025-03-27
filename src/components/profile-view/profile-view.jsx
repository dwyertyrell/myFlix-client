import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import { useParams } from 'react-router';

export const ProfileView = ({ user, token, moviesFromApi}) => {

const {usernameOfUser} = useParams();

const [userLoggedIn, setUserLoggedIn] = useState(null)

// the useEffect keep re rendering- could this be the problem with the null properties? 
// i removed the dependencies

useEffect(()=> {
fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users',
    {
        headers: {
            Authorization: `Bearer ${token}`,
      }
    }
  ).then((response)=> response.json()).then((users)=>{
      console.log('users collection has been retrieved:', users);
      const userFound = users.find((u)=>u.username === usernameOfUser)
      if(userFound) {
          console.log('user object has been found in collection', userFound);
          setUserLoggedIn(userFound)
      } else {
          console.log('user not found in the collection')
      }
  }).catch((err)=> {
      console.error('fetching data failed!!', err)
  })
}, [token, usernameOfUser]) 



// useEffect(()=> {
//     const responseFromApi = async () => {
//         await fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/:username'),
//             {
//                 method: 'PUT',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 // body: JSON.stringify(  ) add the piece of state updated by the form 
                
//             }
//     }

//     })



  return (
        <>
          { userLoggedIn && (
            <>
                <p>username: {userLoggedIn.firstName}</p>
                <p> First Name: {userLoggedIn.firstName}</p>
                <p> Last Name: {userLoggedIn.lastName}</p>
                <p> Age: {userLoggedIn.age}</p>
                <p> username: {userLoggedIn.username}</p>
                <p> password: {userLoggedIn.password}</p>
                <p> birthday: {userLoggedIn.birthday}</p>
                <p> Email: {userLoggedIn.email}</p>
                <p> favourite movies: {userLoggedIn.favouriteMovies}</p>

                <h2>profile infomation</h2>

                {userLoggedIn.favouriteMovies && userLoggedIn.favouriteMovies.length > 0 
                    &&
                    <>
                        <h3>favourite movies</h3>

                        <div>{ userLoggedIn.favouriteMovies.map((movie)=> {
                        const found= moviesFromApi.find((m)=> m.id === movie) 
                        
                        return (
                            <p key={found.id} >{found.title}</p>
                        )
                        })}
                        </div>
                    </> 
                    }
            </>
            ) 
            // : (
            //     <p>please wait while fetching data</p>
            // )
            }
        </>
      )}


 {/* {userLoggedIn ? (
                  <Container>
                    
                      <h2>profile Infomation</h2>
  
                      <p> First Name: {userLoggedIn.firstName}</p>
                      <p> Last Name: {userLoggedIn.lastName}</p>
                      <p> Age: {userLoggedIn.age}</p>
                      <p> username: {userLoggedIn.username}</p>
                      <p> password: {userLoggedIn.password}</p>
                      <p> birthday: {userLoggedIn.birthday}</p>
                      <p> Email: {userLoggedIn.email}</p>
                      <ul>
                          {userLoggedIn.favouriteMovies && userLoggedIn.favouriteMovies.length > 0
                              && (
                                  <>
                                      <h3> Favourite Movies: </h3>
                                      <p>{userLoggedIn.favouriteMovies.map((movies) => {
                                        
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
              } */}
    // const {user} = useParams()
    // const parsedUser= JSON.parse(user)
//     const username = parsedUser.username
// /*testing the useEffect- the return() of component will work but fetch not working  
// the url parameter is passing into url  */
//     useEffect(()=> {
//       fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${username}`,
//               {
//                   headers: {
//                       Authorization: `Bearer ${token}`,
//                 }
//               }
//             ).then((response)=> response.json()).then((data)=> {
//               console.log('data retrevied')
//             }).catch((err)=> {
//               console.error(err, 'fetch failed!')
//             })
//     }, [token])

  // return (
  //   <>
  //   {user ? (
          
  //    <div >hello profile view! {parsedUser.username}  </div>
  //   ) : (
  //     <p>there is no username!</p>
  //   )
  
  // }
  // </>

  // )





    // const [loggedInUser, setLoggedInUser] = useState(null)

    // /*by using the parameter inside the url, just for its information- hence why we use the 
    // hook useParams(). since the information is stringed, i need to parse the data before using. */

    // const {username} = useParams()
    // // let parsedUsername = JSON.parse(username)
  
    // useEffect(() => {
    // fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${username}`,

    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //       }
    //     }).then((response) => response.json()).then((data) => {
    //             setLoggedInUser(data)

    //           // const theUser = data.find((u) => u.username === parsedUser.username);
    //           // if(theUser) {
    //           //   setLoggedInUser(theUser);
    //           // }
    //           // else {
    //           //   setLoggedInUser(null);
    //           // };

    //         }) .catch((err) => {
    //         console.error(err, 'fetching failed')

    //     })
    //   }, [token, loggedInUser])


    //     return (
    //         <>
    //             {loggedInUser ? (
    //             <Container>
    //                 <h2>profile Infomation</h2>

    //                     <p> First Name: {loggedInUser.firstName}</p>
    //                     <p> Last Name: {loggedInUser.lastName}</p>
    //                     <p> Age: {loggedInUser.age}</p>
    //                     <p> username: {loggedInUser.username}</p>
    //                     <p> password: {loggedInUser.password}</p>
    //                     <p> birthday: {loggedInUser.birthday}</p>
    //                     <p> Email: {loggedInUser.email}</p>
    //                     <ul>
    //                         { loggedInUser.favouriteMovies && loggedInUser.favouriteMovies.length > 0
    //                         && (
    //                             <>
    //                                 <h3> Favourite Movies: </h3>
    //                                 <p>{loggedInUser.favouriteMovies.map((movies) => {
    //                                     <li key={movies._id}>{movies.title}</li>
    //                                     })
    //                                     }
    //                                 </p>
    //                             </>
    //                         )}
    //                     </ul>       
    //             </Container>
    //             ) : (
    //                 <p>user not found</p>
    //                 )
    //             }
    //         </>
    //     )
    
















    
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