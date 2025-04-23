// import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useCallback, useState, useEffect } from 'react';


//the helper function returns a boolean value- some.method used to check if at 
// least one element in an user.favouriteMovies array has passed the conditon 
const isMovieInFavourites = (movieId, favouriteMovies) => {
    return favouriteMovies.some((favMovieId) => favMovieId === movieId);
}

export const MovieCard = ({movie, user, token, onAddFavourite, onRemoveFavourite}) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const handleAdd = useCallback(() => {
        if(onAddFavourite && user && token ) {
            onAddFavourite(movie.id);
            setIsFavourite(true);
        }
    }, [onAddFavourite, user, token, movie])
    

    const handleRemove = useCallback(() => {
        if (onRemoveFavourite && user && token) {
            onRemoveFavourite(movie.id);
            setIsFavourite(false);
        }
    }, [user, token, movie, onRemoveFavourite])

    useEffect(() => {
        if (user && user.favouriteMovies) {
            // update the favourite state using the helper function
            setIsFavourite(isMovieInFavourites(movie.id, user.favouriteMovies)); 
        } else {
            // set the favourite state to false
            setIsFavourite(false);
        }
    }, [user, movie, user.favouriteMovies, handleRemove, handleAdd]);



    return (

        <Card className='h-100' >


            <Card.Img  variant='top' src={movie.image} />

            <Card.Body>    
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
                {user && token && (
                    isFavourite ? (
                        <Button 
                        variant='danger' 
                        onClick={handleRemove}
                        >
                        Remove favourite</Button>
                    ) : (
                        <Button 
                        variant='primary'
                        onClick={handleAdd}
                        >
                        Add favourite</Button>
                    )
                )}
            </Card.Body>
        </Card>
    )
} 

MovieCard.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }), 
    onAddFavorite: PropTypes.func.isRequired,
    onRemoveFavorite: PropTypes.func.isRequired,
  };
