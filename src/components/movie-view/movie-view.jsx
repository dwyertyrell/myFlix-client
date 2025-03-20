import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';

export const MovieView = ({movies}) => {

    const {movieId} = useParams()
    const movie = movies.find((m) => m.id === movieId);
    

    let image =  <Card.Img className='h-25' src={movie.image} /> 

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
            </Card.Body>
        </Card>
    )
}

MovieView.PropTypes = {
    movies: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string,
        image: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}