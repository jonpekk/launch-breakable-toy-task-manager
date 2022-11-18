import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ModalForm from "./ModalForm";
import ModalDetails from "./ModalDetails";


const ModalContent = (props) => {

  const renderOptions = {
    view: <ModalDetails bs={props.bd} />,
    create: <ModalForm board={props.board} activeColumn={props.activeColumn} columns={props.columns} handleClose={props.handleClose} setBoard={props.setBoard} />,
  }

  return (
    <div className="grid-y grid-margin-y">
      <div className="form-header">
        <h2 className="md-header">Hello!</h2>
        <button className="close-button" onClick={props.handleClose} title="Close Editor">x</button>
      </div>
      {renderOptions[props.actionStatus]}
    </div>
  )
}

export default withRouter(ModalContent)