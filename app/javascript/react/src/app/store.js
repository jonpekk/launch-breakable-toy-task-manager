import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../features/profile/profileSlice'
import boardsReducer from '../features/board-list/boardsSlice'

export default configureStore({
  reducer: {
    profile: profileReducer,
    boards: boardsReducer
  }
})