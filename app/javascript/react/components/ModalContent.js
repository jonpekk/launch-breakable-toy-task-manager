import React from "react";
import { withRouter } from "react-router-dom";
import ModalForm from "./ModalForm";
import ModalDetails from "./ModalDetails";
import ModalBoardForm from "./ModalBoardForm";
import ModalDelete from "./ModalDelete";


const ModalContent = (props) => {

  const renderOptions = {
    view: <ModalDetails cardID={props.activeCard} />,
    create: <ModalForm board={props.board} activeColumn={props.activeColumn} columns={props.columns} handleClose={props.handleClose} setBoard={props.setBoard} />,
    newBoard: <ModalBoardForm handleClose={props.handleClose} setModalStatus={props.setModalStatus} setNewBoardRedirect={props.setNewBoardRedirect} />,
    delete: <ModalDelete handleClose={props.handleClose} setRedirect={props.setRedirect} setBoards={props.setBoards} />
  }

  return (
    <div className="grid-y grid-margin-y">
      <div className="form-header">
        <button className="close-button" onClick={props.handleClose} title="Close Editor">x</button>
      </div>
      {renderOptions[props.actionStatus]}
    </div>
  )
}

export default withRouter(ModalContent)