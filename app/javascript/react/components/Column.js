import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { withRouter } from "react-router-dom";
import Card from './Card';

const Column = (props) => {
  const handleDrop = (name, cardID) => {
    const taskStatus = name.replace('-', '_').toLowerCase()
    const cardPayload = {
      card: {
        id: cardID,
        status: taskStatus
      }
    }
    changeColumn(cardPayload)
  }

  const changeColumn = async (payload) => {
    try {
      const response = await fetch(`/api/v1/boards/${props.match.params.id}/cards/${payload.card.id}`, {
        credentials: "same-origin",
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      })
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        if (response.status === 200) {
          const responseBody = await response.json()
          props.setBoard(responseBody)
        }
      }
    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  const setCards = () => {
    setColumnCards(props.cards)
  }

  const openModal = () => {
    props.handleOpen({
      ...props.modalStatus,
      openStatus: true,
      activeColumn: props.name
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
        <button onClick={openModal} className="sm-btn primary-btn sticky">Create task</button>
      </div>
    </div >
  )
}

export default withRouter(Column)