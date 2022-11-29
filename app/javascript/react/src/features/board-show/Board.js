import React, { Fragment, useEffect, useState } from "react"
import { withRouter, Link, Redirect } from "react-router-dom";
import _ from 'lodash'
import ReactModal from "react-modal";
import Column from "./Column";
import ModalContent from "../../../components/ModalContent";
import { useSelector, useDispatch } from "react-redux";
import {
  setBoardThunk,
  showBoard
} from './boardSlice'

const Board = (props) => {

  const board = useSelector(showBoard)
  const dispatch = useDispatch()

  if (props.userInfo === null) {
    return <Redirect to='/' />
  }

  const [redirect, setRedirect] = useState(false)

  const handleDeleteModal = () => {
    props.handleOpen({
      ...props.modalStatus,
      openStatus: true,
      actionStatus: "delete"
    })
  }

  useEffect(() => {
    dispatch(setBoardThunk(props.match.params.id))
  }, [])

  if (props.userInfo !== undefined && board.user.id !== props.userInfo.id) {
    return (
      <div className="error-message alone">
        <p>Woops! You don't have access to that board! Please sign in to the correct account or to to the homepage to see what boards you have access to</p>
        <Link className="sm-btn negative-btn" to='/'>Take me home!</Link>
      </div>
    )
  }

  const columns = _.keys(board.columns)
  const columnList = columns.map((column) => {
    return (
      <Column name={column.replace('_', '-').toUpperCase()} key={column} cards={board.columns[column]} handleOpen={props.handleOpen} modalStatus={props.modalStatus} />
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
          activeColumn={props.modalStatus.activeColumn}
          activeCard={props.modalStatus.activeCard}
          actionStatus={props.modalStatus.actionStatus}
          columns={board.columns}
          setRedirect={setRedirect}
        />
      </ReactModal>
    </div >
  )
}

export default withRouter(Board)