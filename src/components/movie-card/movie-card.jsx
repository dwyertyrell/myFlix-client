// import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isMovieFavourite, addFavourite, removeFavourite, addFavouriteMovies, removeFavouriteMovies } from "../../redux/reducers/favouriteSlice";


export const MovieCard = ({movie, user, token}) => {

    const dispatch = useDispatch();
    //to determine the favourite status, for the conditional rendering of <button> 
    const favourite = useSelector((state) => isMovieFavourite(state, movie.id));
    
    const handleAdd = useCallback(() => {

     if(user && token) {
        dispatch(addFavouriteMovies({movieId: movie.id, username: user.username, token}))
    } else {
        alert('please login to add to favourites.')
    }
    }, [ user?.username, token, movie.id, dispatch, ])
    

    const handleRemove = useCallback(() => {

        if(user && token) {
            dispatch(removeFavouriteMovies({movieId: movie.id, username: user.username, token}))
        } else {
            alert('please log in to remove from favourite')
        }
    }, [user, token, movie, dispatch])

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
                    favourite ? (
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
                        Add favourite</Button>) 
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
    })
    
  };
