import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  currentProfile,
  setUserThunk
} from '../src/features/current-user/userSlice';
import BoardList from '../src/features/board-list/BoardList';
import Board from '../src/features/board-show/Board';
import SignIn from './SignIn';
import Profile from '../src/features/current-user/Profile';

export const App = (props) => {

  const profile = useSelector(currentProfile)
  const dispatch = useDispatch()

  Modal.setAppElement('#app');

  const [modalStatus, setModalStatus] = useState({
    openStatus: false,
    activeColumn: null,
    activeCard: null,
    actionStatus: null
  })


  const handleOpen = (statusObj) => {
    setModalStatus(statusObj)
  }

  const handleClose = () => {
    setModalStatus({
      openStatus: false,
      activeColumn: null,
      activeCard: null
    })
  }


  useEffect(() => {
    dispatch(setUserThunk())
  }, [])

  return (
    < DndProvider backend={HTML5Backend} >
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <BoardList
              userInfo={profile}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </Route>
          <Route exact path="/boards/:id">
            <Board
              userInfo={profile}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </Route>
          <Route exact path="/users/sign-in">
            <SignIn
              userInfo={profile}
            />
          </Route>
          <Route exact path="/users/:id">
            <Profile userInfo={profile} />
          </Route>
        </Switch>
      </BrowserRouter>
    </DndProvider >
  )
}

export default App