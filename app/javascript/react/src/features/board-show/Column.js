import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { withRouter } from "react-router-dom";
import Card from './Card';
import { useDispatch } from "react-redux";
import boardSlice, {
  patchCardColThunk,
} from './boardSlice'

const Column = (props) => {
  const dispatch = useDispatch()

  const handleDrop = (name, cardID) => {
    const taskStatus = name.replace('-', '_').toLowerCase()
    const cardPayload = {
      card: {
        id: cardID,
        status: taskStatus,
        board: props.match.params.id
      }
    }
    dispatch(patchCardColThunk(cardPayload))
  }

  const setCards = () => {
    setColumnCards(props.cards)
  }

  const openEditorModal = () => {
    props.handleOpen({
      ...props.modalStatus,
      openStatus: true,
      activeColumn: props.name,
      actionStatus: "create"
    })
  }

  const openDetailModal = (cardID) => {
    props.handleOpen({
      ...props.modalStatus,
      openStatus: true,
      activeColumn: props.name,
      columnList: props.columns,
      actionStatus: "view",
      activeCard: cardID
    })
  }

  const [columnCards, setColumnCards] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "singleCard",
    drop: (item) => handleDrop(props.name, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const cardList = columnCards.map(card => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        status={card.status}
        openDetailModal={openDetailModal}
      />
    )
  })

  useEffect(() => {
    setCards()
  })

  return (
    <div className="todo-list-card card cell large-3 small-8">
      <div className="card-divider">
        <h3>{props.name}</h3>
      </div>
      <div className="card-section grid-y grid-margin-y grid-frame">
        <ul className="cell cell-block-y" ref={drop} style={{ background: isOver ? "#4a4b2f" : "inherit" }}>
          {cardList}
        </ul>
        <button onClick={openEditorModal} className="sm-btn primary-btn sticky">Create task</button>
      </div>
    </div >
  )
}

export default withRouter(Column)