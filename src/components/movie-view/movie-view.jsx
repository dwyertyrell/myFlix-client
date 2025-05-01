import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import { useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { addFavourite, removeFavourite, isMovieFavourite } from '../../redux/reducers/favouriteSlice';

export const MovieView = ({movies, token, user, onAddFavourite, onRemoveFavourite}) => {
    
   
    const {movieId} = useParams(); //use to find the movie data of the URL params in movie array 
    const movie = movies.find((m) => m.id === movieId);
    let image =  <Card.Img className='h-25' src={movie.image} />
     const dispatch = useDispatch();
    const favourite = useSelector((state) => isMovieFavourite(state, movie.id))

    const handleAdd = useCallback(() => {
        if( user && token) {
            // dispatch(addFavourite(movie.id));
            onAddFavourite(movie.id);
        } else {
            alert('please login to add to favourites' )
        }
    }, [ user, token, dispatch]);

    const handleRemove = useCallback(() => {
        if(user && token) {
            // dispatch(removeFavourite(movie.id));
            onRemoveFavourite(movie.id)

        }
    }, [user, token, dispatch]);


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
                favourite ? (
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
    token: PropTypes.string.isRequired
  };