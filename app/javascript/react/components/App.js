import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "react-modal";
import BoardList from './BoardList';
import Board from './Board';
import SignIn from './SignIn';

export const App = (props) => {

  Modal.setAppElement('#app');

  const [userInfo, setUserInfo] = useState(undefined)
  const [boards, setBoards] = useState([])
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

  const getUser = async () => {
    try {
      const response = await fetch('/api/v1/current-user')
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        if (responseBody) {
          setUserInfo(responseBody)
        } else {
          setUserInfo(null)
        }
      }

    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    < DndProvider backend={HTML5Backend} >
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <BoardList
              userInfo={userInfo}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              handleClose={handleClose}
              handleOpen={handleOpen}
              boards={boards}
              setBoards={setBoards}
            />
          </Route>
          <Route exact path="/boards/:id">
            <Board
              userInfo={userInfo}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              handleClose={handleClose}
              handleOpen={handleOpen}
              boards={boards}
              setBoards={setBoards}
            />
          </Route>
          <Route exact path="/users/sign-in">
            <SignIn
              userInfo={userInfo}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </DndProvider >

  )
}

export default App