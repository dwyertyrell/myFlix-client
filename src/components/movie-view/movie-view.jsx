import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import "bootstrap/dist/css/bootstrap.min.css";

export const MovieView = ({movie, onBackClick}) => {

    let image =  <Card.Img className='h-25' src={movie.image} /> 

    return (
        <Card className='w-50 h-50'>
            
        {/* if movie.image is truthy, then render this markup. if falsey, then
        do nothing. */}
           {movie.image && image}

            <Card.Body>

                
                <Card.Title>title: {movie.title} </Card.Title>
                
            
                <Card.Text>{movie.genre}</Card.Text>
          
                <Card.Text>Description: {movie.description}</Card.Text>
           
                {/* add a conditional rendering for movie.director? already done in 
                the state of MainView */}
                <Card.Text>Director's name/bio: {movie.director}  </Card.Text>
                
            
            <Button className='primary' onClick={onBackClick}>Back</Button>
            </Card.Body>
        </Card>
    )
}

MovieView.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string,
        image: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}