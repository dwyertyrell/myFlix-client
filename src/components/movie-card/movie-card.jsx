import PropTypes from 'prop-types'

export const MovieCard = ({movie, onMovieClick}) => {
    return <div onClick={()=> {
        onMovieClick(movie);
    }}
    > {movie.title}</div>
} 

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};