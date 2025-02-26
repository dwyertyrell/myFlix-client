import {useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";

export const MainView = () => {
  /* the setMovies is a callback function that allows you to update
  the movies data*/
    const [movies, setMovies] = useState([ 
      {
      id: 1,
      title: 'The Shawshank Redemption',
      image:"https://m.media-amazon.com/images/I/51EZXDOXBfL._AC_.jpg",
      description: 'A banker wrongly imprisoned for murder.',
      genre: { title: 'Drama' },
      director: {
        name: 'Frank Darabont',
        bio: 'American film director',
        
      }
  },
  {
      id: 2,
      title: 'The Godfather',
      image:"https://m.media-amazon.com/images/I/71SIcDWmeyL.__AC_SX300_SY300_QL70_ML2_.jpg",
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      genre: { title: 'Crime' },
      director: {
        name: 'Francis Ford Coppola',
        bio: 'American film director',
        
      }
    },
  {
      id: 3,
      title: 'The Dark Knight',
      image:"https://m.media-amazon.com/images/I/5151N2hUPiL.__AC_SX300_SY300_QL70_ML2_.jpg",
      description: 'When the menace known as the Joker wreaks havoc and chaos on the city of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      genre: { title: 'Action' },
      director: {
        name: 'Christopher Nolan',
        bio: 'British-American film director',
        
      }
  }]);
/* the setSelectedMovies function is used to track the currrently selected movie */
  const [selectedMovie, setSelectedMovie] = useState(null);

  if(selectedMovie) {
    return <MovieView 
    movie={selectedMovie}
    /*setting the setSelectedMovie to null, removes the currently selected Movie,
     for the user to use the function again for a different movie */
    onBackClick={()=> setSelectedMovie(null)}
    />
  }

    if(movies.length === 0) {
        return <div>the list is empty</div>
    } 
    else {
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
} 