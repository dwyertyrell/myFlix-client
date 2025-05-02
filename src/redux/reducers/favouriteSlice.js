import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteMoviesIds: [],
  loading: '',
  error: null
};

//Async Thunk for adding a movie to favourites
export const addFavouriteMovies = createAsyncThunk( 
  'favourites/addFavouriteMovie', 
  async({movieId, username, token}, {dispatch, getState}) => {
    try {
      const response = await fetch(`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${users.username}/${movieId}`, 
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if(!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add movie to favourites');
        }

        //optimistically update the state- so if this fails, revert changes using the 
        // opposite action effect

        dispatch(addFavourite(movieId));
        //this return value becomes the payload of the value of the fulfilled action.
        return {movieId}
    } catch (error) {
      //if the API call fails, revert the optimistic update
      dispatch(removeFavourite(movieId));
      throw error
    }
  }
)

export const removeFavouriteMovies = createAsyncThunk(
  'favourites/removeFavouriteMovie', 
  async({movieId, username, token}, {dispatch, getState}) => {
    try {
      const response = await fetch (`https://secret-eyrie-53650-99dc45662f12.herokuapp.com/users/${username}/${movieId}`, 
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if(!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'failed to remove movie from favourites');
        }

        //optimistically update the state
        dispatch(removeFavourite(movieId));
        return {movieId}
    } catch (error) {
      //if API call fails, revert the optimistic update
      dispatch(addFavourite(movieId));
      throw error
    }
  }
)

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
        
        state.favouriteMoviesIds= action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addFavouriteMovies.pending, (state) => {
      state.loading = 'pending';
      state.error = null; 
    })
    .addCase(addFavouriteMovies.fulfilled, (state, action) => {
      state.loading = 'succeeded';
    })
    .addCase(addFavouriteMovies.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.message
    })
    .addCase(removeFavouriteMovies.pending, (state) => {
      state.loading = 'pending';
      state.error = null; 
    })
    .addCase(removeFavouriteMovies.fulfilled, (state, action) => {
      state.loading = 'succeeded';
    })
    .addCase(removeFavouriteMovies.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.message
    });
  }
});

export const {addFavourite, removeFavourite, setFavourites} = favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
//the if statement in the reducer could be used as a piece of state, in the child components
export const selectFavouriteMovieIds = (state) => state.favourites.favouriteMoviesIds
export const isMovieFavourite = (state, movieId) => {
  Array.isArray(state.favourites.favouriteMoviesIds) && state.favourites.favouriteMoviesIds.includes(movieId)
}
export const selectFavouriteLoading = (state) => state.favourite.loading;
export const selectFavouriteError = (state) => state.favourite.error
/*
the component and the API is not communicating. the PUT request is not being processed. even its error
message isn't being processed. what is happening 
 */  