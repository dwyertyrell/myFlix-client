import {configureStore} from '@reduxjs/toolkit';
import {movieReducer} from './reducers/movieSlice';
import { favouriteReducer } from './reducers/favouriteSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    favourites: favouriteReducer
  }
});

export default store