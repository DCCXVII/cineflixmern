import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching the watchlist data
export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (userId, thunkAPI) => {
    try {
      // Make a request to your backend to fetch the watchlist data
      const response = await axios.get(`/api/watchlist/${userId}`);
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the request
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the watchlist slice
const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    // Add any additional reducer actions for manipulating the watchlist
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunk and reducer actions
export { fetchWatchlist };

// Export the watchlist reducer
export default watchlistSlice.reducer;