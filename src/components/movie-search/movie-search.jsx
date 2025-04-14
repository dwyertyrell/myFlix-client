import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";

export const MovieSearch = ({movies, setFiltered, user, token, onAddFavourite, onRemoveFavourite}) => {
  const [searchTerm, setSearchTerm] = useState('');
  //this will hold the movie that match the current searchTerm (the user's input)
  //so, it will be an intermediary between the searchTerm and filtered state? 
  const [localSearchResults, setLocalSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');

  useEffect(()=> {
    if(!searchTerm) {
      setFiltered(movies);
      setLocalSearchResults([]);
      setSearchError('')
      return;
    }

    const results = movies.filter( (movie) =>{  

      //will return an array with one element: the object movie.title === to searchTerm state   
      return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    });

    if(results.length === 0) {
    setFiltered([])
    setLocalSearchResults([])
    setSearchError(`no movie for ${searchTerm}.`)
    } else {
      setFiltered(results)
      setLocalSearchResults(results)
      setSearchError('')
      console.log('results of filtering:', results)
    }
    if (results) {
      console.log('results of filtering:', results)
    } else {
      console.log('no results value')
    }

  }, [searchTerm, setFiltered, movies, setLocalSearchResults, setSearchError])

  return (
    <> 
    <Row>  
      <Form>
        <Form.Control
          type='text'
          placeholder= 'search for movies...'
          value= {searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          />
      </Form>

      { searchError ? (
        <p className= 'text-danger'>{searchError}</p>
      ) : (
        // console.log('localSearchResults', localSearchResults)

        localSearchResults.map(movie => {
          return (
            <Col 
            key= {movie.id}
            xs={12}
						sm={6}
						md={4}
						lg={3}>
          <MovieCard
            //the movie prop is holding the argument of the map() as its value.
            movie= {movie}
            user={user}
            token={token}
            onAddFavourite= {onAddFavourite}
            onRemoveFavourite={onRemoveFavourite}
          /> 
          </Col>)
        })
      
      )}
      </Row>
    </>

    )
}