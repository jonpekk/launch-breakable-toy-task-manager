import React, { Fragment, useEffect, useState } from "react"
import { withRouter, Link, Redirect } from "react-router-dom";
import _ from 'lodash'
import ReactModal from "react-modal";
import Column from "./Column";
import ModalContent from "./ModalContent";

const Board = (props) => {

  if (props.userInfo === null) {
    return <Redirect to='/' />
  }

  const [board, setBoard] = useState({
    user: {},
    cards: []
  })

  const [redirect, setRedirect] = useState(false)

  const handleDeleteModal = () => {
    props.handleOpen({
      ...props.modalStatus,
      openStatus: true,
      actionStatus: "delete"
    })
  }

  const getBoard = async () => {
    try {
      const response = await fetch(`/api/v1/boards/${props.match.params.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        setBoard(responseBody)
      }

    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  useEffect(() => {
    getBoard()
  }, [])

  if (props.userInfo !== undefined && board.user.id !== props.userInfo.id) {
    return (
      <div className="error-message alone">
        <p>Woops! You don't have access to that board! Please sign in to the correct account or to to the homepage to see what boards you have access to</p>
        <Link className="sm-btn negative-btn" to='/'>Take me home!</Link>
      </div>
    )
  }

  const columns = ['BACKLOG', 'TO-DO', 'DOING', 'DONE']

  const columnList = columns.map(column => {

    const cards = board.cards.filter(card => {
      return card.status.replace('_', '-').toUpperCase() === column
    })

    return (
      <Column name={column} cards={cards} key={column} setBoard={setBoard} handleOpen={props.handleOpen} modalStatus={props.modalStatus} />
    )
  })

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <section className="top-body-section">
        <h2 className="sm-header positive">{board.name}</h2>
        <button className="sm-btn danger-zone" onClick={handleDeleteModal}>DELETE BOARD</button>
      </section>
      <ul className="board-container grid-margin-x grid-x cell-block grid-frame">
        {columnList}
      </ul>
      <ReactModal
        isOpen={props.modalStatus.openStatus}
        contentLabel={"Create new task"}
        onRequestClose={props.handleClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        overlayClassName="editor-section grid-x overlay-styles"
        className="editor-container large-6 medium-8 small-12 large-offset-3 medium-offset-2"
      >
        <ModalContent
          handleClose={props.handleClose}
          board={board}
          setBoard={setBoard}
          setBoards={props.setBoards}
          activeColumn={props.modalStatus.activeColumn}
          activeCard={props.modalStatus.activeCard}
          actionStatus={props.modalStatus.actionStatus}
          columns={columns}
          setRedirect={setRedirect}
        />
      </ReactModal>
    </div >
  )
}

export default withRouter(Board)