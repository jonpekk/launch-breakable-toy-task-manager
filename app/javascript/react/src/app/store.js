import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../features/current-user/userSlice'
import boardsReducer from '../features/board-list/boardsSlice'
import individualBoardReducer from '../features/board-show/boardSlice'

export default configureStore({
  reducer: {
    profile: profileReducer,
    boards: boardsReducer,
    board: individualBoardReducer
  }
})