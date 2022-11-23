import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FetchUser from '../../../components/services/FetchUser';

const userSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {
      boards: [],
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

const { setUser } = userSlice.actions

export const setUserThunk = createAsyncThunk('setUser', async (urlParam, { dispatch }) => {
  const user = await FetchUser.getUser(urlParam)
  dispatch(setUser(user))
})

export const currentProfile = (state) => state.profile.user

export default userSlice.reducer