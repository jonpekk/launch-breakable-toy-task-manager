import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FetchBoards from '../../../components/services/FetchBoards';

const boardsSlice = createSlice({
  name: 'userBoards',
  initialState: {
    boards: []
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
    }
  }
})

const { setBoards } = boardsSlice.actions

export const setBoardsThunk = createAsyncThunk('setBoards', async (state, { dispatch }) => {
  const boards = await FetchBoards.getBoards()
  dispatch(setBoards(boards))
})

export const userBoards = (state) => state.boards.boards

export default boardsSlice.reducer