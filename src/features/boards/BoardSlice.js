import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoards } from "../../services/trelloApi";
import { createBoard as apiCreateBoard } from "../../services/trelloApi";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, thunkAPI) => {
    try {
      const response = await getBoards();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async ({ title, prefs_background }, thunkAPI) => {
    try {
      const response = await apiCreateBoard({ title, prefs_background });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createBoard.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = "succeeded";
        console.log(action.payload);
        state.boards.unshift(action.payload);
      })

      .addCase(createBoard.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
