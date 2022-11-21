import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const ModalDelete = props => {


  const deleteBoard = async () => {
    try {
      const response = await fetch(`/api/v1/boards/${props.match.params.id}`, {
        credentials: "same-origin",
        method: "DELETE",
      })
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(`Error! ${errorMessage}`)
        throw (error)
      } else {
        const responseBody = await response.json()
        props.setBoards(responseBody)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = () => {
    deleteBoard()
    props.setRedirect(true)
    props.handleClose()
  }

  return (
    <Fragment>
      <h2>ARE YOU SURE YOU WANT TO DELETE THIS BOARD? YOU CANNOT UNDO THIS ACTION!</h2>
      <p className="negative">Please make sure you are serious about this one</p>
      <div className="editor-form-actions">
        <button className="sm-btn danger-zone" onClick={handleDelete}>Yep, I'm sure!</button>
        <button className="sm-btn" onClick={props.handleClose}>Close without deleting</button>
      </div>
    </Fragment>
  )
}

export default withRouter(ModalDelete)