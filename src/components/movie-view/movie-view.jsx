export const MovieView = ({movie, onBackClick}) => {
    return (
        <>
            <div>
                <img src={movie.image}/>
            </div>

            <div>
                <span>Title: </span>
                <span>{movie.title} </span>
                
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div> 

            <br></br>
            
            <div>
                <span>Director: </span>
                <span>{movie.director.name} </span>
                <br></br>
                <span>{movie.director.bio} </span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </>
    )
}