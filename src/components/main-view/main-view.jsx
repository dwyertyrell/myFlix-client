import {useState, useEffect} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";

export const MainView = () => {
  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [users, setUsers] = useState(null);
  const [token, setToken] = useState('')


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
            title: movie.title,
            director: movie.director.name || movie.director.bio,
            genre: movie.genre.title,
            description: movie.description
          };
        });
          setMovies(moviesFromApi)
      }).catch((e) => {
            console.error('something wrong happened while fetching movie data')
          });

  }, [token]);

    const handleLogIn = (user, token) => {
      setUsers(user);
      setToken(token);      
    }
   /*this function isn't being called. therefore state isn't being 
      updated  */


  if(!users) { 
    // we are updating onLoggedIn to not only set the 
    // users state, but also token state.
   return (<LoginView onLoggedIn= {handleLogIn}
   />)
  }


  if(selectedMovie) {
    return <MovieView 
    movie={selectedMovie}
    /*setting the setSelectedMovie to null, removes the currently selected Movie,
     for the user to use the function again for a different movie */
    onBackClick={()=> setSelectedMovie(null)}
    />
  }

    if (movies.length === 0) {
        return <div>the list is empty</div>
    } 
    
      return (
        <div>
          <button onClick={()=> {
            setUsers(null)
            setToken(null)}} >log out</button>
          
          {movies.map((movie) => {
            return <MovieCard
             key={movie.id}
             movie={movie}
             onMovieClick={(newSelectedMovie)=> {
              setSelectedMovie(newSelectedMovie);
             }}
             />

          })}
        </div> 
      )
    
} 

/*i need to learn how to unhash passwords for practising postman requests */