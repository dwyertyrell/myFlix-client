import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';

//helper function 
const isMovieInFavourites = (movieId, favouriteMovies) => {
    return favouriteMovies.some((favMovieId) => favMovieId === movieId);
}

export const MovieView = ({movies, onAddFavourite, onRemoveFavourite, token, user}) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const {movieId} = useParams()
    const movie = movies.find((m) => m.id === movieId);
    let image =  <Card.Img className='h-25' src={movie.image} />
    
    const handleAdd = useCallback(() => {
        if(onAddFavourite && user && token ) {
            onAddFavourite(movie.id);
            setIsFavourite(true);
        }
    }, [onAddFavourite, user, token, movie]);

    const handleRemove = useCallback(() => {
        if (onRemoveFavourite && user && token) {
            onRemoveFavourite(movie.id);
            setIsFavourite(false);
        }
    }, [user, token, movie, onRemoveFavourite]);

    useEffect(() => {
        if (user && user.favouriteMovies) {
            // update the favourite state using the helper function
            setIsFavourite(isMovieInFavourites(movie.id, user.favouriteMovies)); 
        } else {
            // set the favourite state to false
            setIsFavourite(false);
        }
    }, [user, user.favouriteMovies, movie]);

    return (
        <Card className='w-50 h-50'>
                        {console.log('movieView rendered')}

           {movie.image && image}

            <Card.Body>

                
                <Card.Title>title: {movie.title} </Card.Title>
                
            
                <Card.Text>{movie.genre}</Card.Text>
          
                <Card.Text>Description: {movie.description}</Card.Text>
           
                {/* add a conditional rendering for movie.director? already done in 
                the state of MainView */}
                <Card.Text>Director's name/bio: {movie.director}  </Card.Text>
                
            <Link to={`/`}>
                <Button className='primary'>Back</Button>
                
            </Link>
            {
                isFavourite ? (
                    <Button onClick={handleRemove} variant='danger'>remove from favourite</Button>
                ) : (
                    <Button onClick={handleAdd} variant='primary'>add to favourite</Button>

                )
            }
            </Card.Body>
        </Card>
    )
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
    token: PropTypes.string.isRequired,
    onAddFavorite: PropTypes.func.isRequired,
    onRemoveFavorite: PropTypes.func.isRequired
  };