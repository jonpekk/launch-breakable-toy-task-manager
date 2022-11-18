import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ModalForm from "./ModalForm";


const ModalContent = (props) => {

  return (
    <div className="grid-y grid-margin-y">
      <div className="form-header">
        <h2 className="md-header">Create Task</h2>
        <button className="close-button" onClick={props.handleClose} title="Close Editor">x</button>
      </div>
      <ModalForm board={props.board} activeColumn={props.activeColumn} columns={props.columns} handleClose={props.handleClose} setBoard={props.setBoard} />
    </div>
  )
}

export default withRouter(ModalContent)