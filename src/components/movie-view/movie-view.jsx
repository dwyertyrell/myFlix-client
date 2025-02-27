import PropTypes from 'prop-types'
export const MovieView = ({movie, onBackClick}) => {

    let image = <div> <img src={movie.image} /> </div>
    return (
        <>
        {/* if movie.image is truthy, then render this markup. if falsey, then
        do nothing. */}
            {movie.image && image}

            <div>
                <span>Title: </span>
                <span>{movie.title} </span>
                
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div> 

            
            <div>
                {/* add a conditional rendering for movie.director? */}
                <span>Director's name/bio: </span>
                <span>{movie.director} </span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </>
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