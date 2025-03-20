// import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export const MovieCard = ({movie}) => {
    
    return (

        <Card className='h-100' >


            <Card.Img  variant='top' src={movie.image} />

            <Card.Body>    
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    )
} 

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

/*let's make this react element more stylish by replacing the jsx element with 
Card- related bootstrap component.

before the bootstrap component:
export const MovieCard = ({movie, onMovieClick}) => {
    return <div onClick={()=> {
        onMovieClick(movie);
    }}
    > {movie.title}</div>
} 

after applying bootstrap: 

export const MovieCard = ({movie, onMovieClick}) => {
    
    return (
        <Card>
            <Card.Img style={{width: 300}} variant='top' src={movie.image} />

            <Card.Body>    
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <Button 
                onClick={()=> {onMovieClick(movie);}}
                variant= 'link' >open</Button>
            </Card.Body>
        </Card>
    )
} 
    if we want ot make the whole card clickable, we could just add the onClick 
    attribute onto <Card> instead of the <Button> component.

    remove variant attribute on <Button> to apply own sccs styling. variant 
    attribute allows you to chose a predefined set of styles- it is a convenient 
    way of styling without using scss.
*/

/* add <Link> to child component- this will link a rendered component to 
a path of one of the <Route> components.

before adding <Link> tag and removing the {onMovieClick} prop:

export const MovieCard = ({movie, onMovieClick}) => {
    
    return (
        <Card className='h-100' >
            <Card.Img  variant='top' src={movie.image} />

            <Card.Body>    
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <Button 
                onClick={()=> {onMovieClick(movie);}}
                variant= 'secondary' >open</Button>
            </Card.Body>
        </Card>
    )
} 


afterremoving prop and adding <Link>:

<Link to={`/movies/$encodeURIComponent(movie.id)`}>
                    <Button variant= 'link' >open</Button>
                </Link>

encodeURIComponent(movie.id) is called with movie.id. this is to help link to the
url params in MainView. 
this isn't always needed- ${movie.id} would suffice. however, the key property used
for the movie.id contains non-alphanumeric characters- these don't go well with 
url params.
encodeURIComponent() is used to replace the non-alphanumeric characters with 
URL-friendly characters.
 */