import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FetchBoards from '../../../components/services/FetchBoards';

const boardSlice = createSlice({
  name: "showBoard",
  initialState: {
    board: {
      user: {
        id: undefined
      },
      columns: {}
    }
  },
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload
    },
    patchCardCol: (state, action) => {
      state.board = action.payload
    }
  }
})

export const { setBoard, patchCardCol } = boardSlice.actions

export const setBoardThunk = createAsyncThunk('setBoard', async (urlParam, { dispatch }) => {
  const board = await FetchBoards.getIndividualBoard(urlParam)
  dispatch(setBoard(board))
})

export const patchCardColThunk = createAsyncThunk('patchCardCol', async (cardPayload, { dispatch }) => {
  const newCard = await FetchBoards.patchCard(cardPayload)
  dispatch(patchCardCol(newCard))
})

export const showBoard = (state) => state.board.board

export default boardSlice.reducer