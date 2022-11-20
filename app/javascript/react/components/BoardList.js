import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactModal from "react-modal";
import ModalContent from "./ModalContent";
import BoardTile from './BoardTile';

const BoardList = ({ userInfo, modalStatus, handleClose, handleOpen }) => {

  const [boards, setBoards] = useState([])
  const [newBoardRedirect, setNewBoardRedirect] = useState(null)

  const getBoards = async () => {
    try {
      const response = await fetch('/api/v1/boards')
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        setBoards(responseBody)
      }

    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  useEffect(() => {
    getBoards()
  }, [])

  if (userInfo === null) {
    return (
      <div className="error-message alone">
        <p className=''>Hi! Looks like you aren't logged in! Please sign in or sign up to get stuff done!</p>
        <Link className="sm-btn negative-btn" to='/users/sign-in'>Sign in!</Link>
      </div>
    )
  } else {
    const boardList = boards.map((board) => {
      return (
        <BoardTile
          name={board.name}
          shortcode={board.shortcode}
          description={board.description}
          user={board.user}
          key={board.id}
          id={board.id}
        />
      )
    })

    const handleClick = () => {
      handleOpen({
        ...modalStatus,
        openStatus: true,
        actionStatus: "newBoard"
      })
    }

    if (newBoardRedirect) {
      handleClose()
      return <Redirect to={`/boards/${newBoardRedirect}`} />
    }

    return (
      <Fragment>
        <h2>Welcome!</h2>
        <div className="board-index-container">
          <button className="sm-btn" onClick={handleClick}>Create Board</button>
          <ul className="grid-x grid-margin-x">
            {boardList}
          </ul>
        </div>

        <ReactModal
          isOpen={modalStatus.openStatus}
          contentLabel={"Create new task"}
          onRequestClose={handleClose}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          overlayClassName="editor-section grid-x overlay-styles"
          className="editor-container large-6 medium-8 small-12 large-offset-3 medium-offset-2"
        >
          <ModalContent
            handleClose={handleClose}
            actionStatus={modalStatus.actionStatus}
            setNewBoardRedirect={setNewBoardRedirect}
          />
        </ReactModal>
      </Fragment>
    )
  }
}

export default BoardList