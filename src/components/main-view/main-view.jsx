import {useState, useEffect, useCallback} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieSearch } from "../movie-search/movie-search";
import Row from "react-bootstrap/Row"; 
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {NavigationBar} from '../navigation-bar/navigation-bar';
import { ProfileView } from "../profile-view/profile-view";
import { useDispatch, useSelector} from 'react-redux';
import { setMovies } from "../../redux/reducers/movieSlice";

export const MainView = () => {

  const movies= useSelector((state) => state.movies.movies);
  // const [movies, setMovies] = useState([]);
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [users, setUsers] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null );
  const [filtered, setFiltered] = useState(movies);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!token) {
      return; 
    }

    fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/movies',
      {
        headers: {Authorization: `Bearer ${token}`}
      }).then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map(movie => {
          return {
            id: movie._id,
            image: movie.image,
            title: movie.title,
            director: movie.director.name || movie.director.bio,
            genre: movie.genre.title,
            description: movie.description
          };
        });
          dispatch(setMovies(moviesFromApi))
          setFiltered(moviesFromApi);
      }).catch((e) => {
            console.error('something wrong happened while fetching movie data')
          });

  }, [token]);

  // login
    const handleLogIn = (user, token) => {
      setUsers(user);
      setToken(token);      
    }
    // logout
    const handleLogOut = () => {
      setUsers(null);
      setToken(null);
      localStorage.clear();
    }
//a prop passed into ProfileView used to keep the state centralised on the parent component
  const handleProfileUpdate = (updatedUser) => {
    console.log('user has been updated');
    setUsers(updatedUser);
    localStorage('user', JSON.parse(updatedUser));
  }

  // study useCallback hook on react? 
  const handleAddFavourite = useCallback(async (movieId) => {
    if (!users || !token) {
      alert('please log in to add to favourites');
    
    return;
    }

    const prevUser = {...users};

    try {
      //optimistically updates the UI
      const updatedUser = {
        ...users,
        favouriteMovies: users.favouriteMovies ? [...users.favouriteMovies, movieId] : [movieId]
      };
    setUsers(updatedUser);

      const response = await fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${users.username}/${movieId}`, 
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'failed to add movie to favourite');
        }

        if (response.status === 202) {
          // console.log('response.ok for adding to favourite');
          return null;
        }
    } catch (error){ 
      console.error('error adding to favourite', error);
      alert(`failed to add to favourites: ${error.message}`);
      // reverting the user state back to its value before the handleAddFavourite

      setUsers(prevUser);
     }
    }, [users, token]);



  const handleRemoveFavourite = useCallback(async (movieId) => {
    if (!users || !token) {
      alert('log in to removed favourite')
      return;
    };
    const prevUser = {...users};

    try{
      //optimistically updates the UI
      const updatedUser = {
        ...users,
        favouriteMovies: users.favouriteMovies ? [...users.favouriteMovies, movieId] : [movieId]
      }; 
      setUsers(updatedUser);

      const response = await fetch (`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${users.username}/${movieId}`, 
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('error while removing from fav')
          const errorData = await response.json();
          throw new Error(errorData.message || 'failed to remove the movie from favourites');
        }

        if (response.status === 202) {
          console.log('response.ok for removing favourite')
          return null
        }
      
    } catch (error) {
      console.error(`error removing movie from favourites ${error}`);
      alert(`movie from favourite list failed to be removed: ${error.message}`);
      setUsers(prevUser);
    };
  }, [users, token])
    
    return (
        <BrowserRouter>
        { users && (
        <NavigationBar user={users} 
        onLoggedOut={handleLogOut}/> )}

            <Row className='justify-content-md-center'>
              <Routes>

                <Route 
                path='/signup'
                element= {
                  <>
                    {users ? (
                      <Navigate to='/' />
                    ) : 
                    <Col md={4} style={{border:' 2px solid green'}}>
                         <SignupView />
                    </Col>
                  }
                  </>

                } />
                {/* Login */}
                <Route
                  path='/login'

                  element={
                      <>
                      { users ? (
                        <Navigate to='/'/>
                      ) : (
                        <Col md={4} style={{border:' 2px solid green'}}>
                            <LoginView onLoggedIn={handleLogIn} /> 
                        </Col>
                    )}
                        
                    </>
                  }
                ></Route>

                {/* SignUp */}
              <Route path= '/signup' element= {
                <>
                  { users ? (
                    <Navigate to='/'/>
                  ): (
                    <SignupView/>
                  )}
                </>
              }></Route>

              {/* profile */}
              <Route
                path='/users/:usernameOfUser'
                element= {
                <>
                {!users ? (
                    <Navigate to='/login' replace />
                  
                    ) : (
                <ProfileView 
                user={users} 
                token={token} 
                moviesFromApi={movies}
                onProfileUpdate={handleProfileUpdate}
                onLogout={handleLogOut}
                />
                )}
                </>
                }
              >
                </Route>
                
                {/* movie-view */}
              <Route
              path='/movies/:movieId'
              element = { 
                <>
                {!users ? (
                  <Navigate to='/login'/>
                ) : movies.length === 0 ? (
                  <Col>the list is empty</Col>

                ) : (
                  <MovieView
                    movies={movies}
                    onAddFavourite={handleAddFavourite}
                    removeFavourite={handleRemoveFavourite}
                    token={token}
                    user={users}
                  />
                  )}
                </>
              }
              />
              {/* Home */}
              <Route
              path='/'
              element= {
                <>
                  { !users ? (
                    <Navigate to='/login' replace />
                  
                    ): movies.length === 0 ? (
                      <div>the list is empty</div>
                    ) : (
                      <>
                        <Button
                            variant='secondary'
                            className=' w-100 '
                            onClick={handleLogOut}
                          >
                            log out
                          </Button>
                          
                          {/* add MovieSearch component here */}
                          <MovieSearch 
                          movies={movies} 
                          setFiltered={setFiltered}
                          user= {users}
                          token = {token}
                          onAddFavourite={handleAddFavourite}
                          onRemoveFavourite={handleRemoveFavourite}
                          />
                          
                          {movies.map((movie) => (
                            <Col md={3}  key={movie.id} className='mb-5'>
                            {/*key attribute need to be added to the grid system's container 
                            element of the component being rendered */}
                            <MovieCard 
                              movie={movie}
                              onAddFavourite={handleAddFavourite}
                              onRemoveFavourite={handleRemoveFavourite}
                              user={users}
                              token={token}
                            />
                            </Col>
                          ))}
                        
                      </> 
                      )
                  }
                     
                </>

              }></Route>
 
              
              </Routes>
            </Row>
        </BrowserRouter>
    );
  }
