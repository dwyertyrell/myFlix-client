import {configureStore} from '@reduxjs/toolkit';
import {movieReducer} from './reducers/movieSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer
  }
});

export default store