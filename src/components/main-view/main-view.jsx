import {useState, useEffect} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";

export const MainView = () => {
  
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/movies')
    .then((res) => res.json())
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
    });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

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