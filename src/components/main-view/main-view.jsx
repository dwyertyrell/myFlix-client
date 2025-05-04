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
import { setFavourites, selectFavouriteMovieIds } from "../../redux/reducers/favouriteSlice";

export const MainView = () => {

  const movies= useSelector((state) => state.movies.movies);
  const favouriteMoviesIds = useSelector(selectFavouriteMovieIds) // get favourite ID's from redux store
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

          //fetch user's favourite movies upon login- to initialise the redux store upon the login event
          if(users?.username){
          fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${users.username}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }).then((response) => response.json())
            .then((data) => {
              
             const initialFavourites = data?.favouriteMovies || [];
             dispatch(setFavourites(initialFavourites));
            }).catch((error) => {
              console.error('Error fetching user favourites:', error);
              dispatch(setFavourites([]));
            });
          }
        

  }, [token, users, dispatch]);

  useEffect(()=>{
    console.log('updated redux favourite state', favouriteMoviesIds )
  }, [favouriteMoviesIds])

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
      //clear favourites on logout 
      dispatch(setFavourites([]));
    }
//a prop passed into ProfileView used to keep the state centralised on the parent component
  const handleProfileUpdate = (updatedUser) => {
    console.log('user has been updated');
    setUsers(updatedUser);
    localStorage('user', JSON.parse(updatedUser));
  }

    
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
                          />
                          
                          {movies.map((movie) => (
                            <Col md={3}  key={movie.id} className='mb-5'>
                            {/*key attribute need to be added to the grid system's container 
                            element of the component being rendered */}
                            <MovieCard 
                              movie={movie}
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
