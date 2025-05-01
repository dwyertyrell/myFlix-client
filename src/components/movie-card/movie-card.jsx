// import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isMovieFavourite, addFavourite, removeFavourite } from "../../redux/reducers/favouriteSlice";


export const MovieCard = ({movie, user, token, onAddFavourite, onRemoveFavourite}) => {
    const dispatch = useDispatch();
    //to determine the favourite status, for the conditional rendering of <button> 
    const favourite = useSelector((state) => isMovieFavourite(state, movie.id));
    
    const handleAdd = useCallback(() => {
        console.log('user clicked add favourtie button in MovieCard');

     if(user && token) {
        /*to directly use redux here, i would need to learn async action creators?  otherwise, i would
        be making the same mistake as prior*/ 
        // dispatch(addFavourite(movie.id));
        onAddFavourite(movie.id)
    } else {
        alert('please login to add to favourites.')
    }
    }, [ user, token, movie, dispatch, onAddFavourite ])
    

    const handleRemove = useCallback(() => {
        console.log('user clicked remove favourtie button');

        if(user && token) {
            // dispatch(removeFavourite(movie.id));
            onRemoveFavourite(movie.id);
        } else {
            alert('please log in to remove from favourite')
        }
    }, [user, token, movie, onRemoveFavourite])

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
    })
    
  };
