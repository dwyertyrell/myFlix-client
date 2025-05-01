import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteMoviesIds: [],
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      if( state.favouriteMoviesIds && !state.favouriteMoviesIds.includes(action.payload)) {
        state.favouriteMoviesIds.push(action.payload);
      };
    },
    removeFavourite: (state, action) => {
      state.favouriteMoviesIds = state.favouriteMoviesIds.filter((id)=> {
        id !== action.payload
      });
      },
      setFavourites: (state, action) => {
        if(!setFavourites) {
          console.log('empty value of setFavourites')
        } else {
        console.log('logging the value of the payload', action.payload )
        }
        state.favouriteMoviesIds= action.payload;
      }
  }
})

export const {addFavourite, removeFavourite, setFavourites} = favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
//the if statement in the reducer could be used as a piece of state, in the child components
export const selectFavouriteMovieIds = (state) => state.favourites.favouriteMoviesIds
export const isMovieFavourite = (state, movieId) => {
  Array.isArray(state.favourites.favouriteMoviesIds) && state.favourites.favouriteMoviesIds.includes(movieId)
}
/*
the component and the API is not communicating. the PUT request is not being processed. even its error
message isn't being processed. what is happening 
 */  