import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Card from './Card';

const Column = ({ name, cards, setBoard }) => {
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
      const response = await fetch(`/api/v1/cards/${payload.card.id}`, {
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
          setBoard(responseBody)
        }
      }
    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  const setCards = () => {
    setColumnCards(cards)
  }

  const [columnCards, setColumnCards] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "singleCard",
    drop: (item) => handleDrop(name, item.id),
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
        <h3>{name}</h3>
      </div>
      <div className="card-section grid-y grid-margin-y grid-frame">
        <ul className="cell cell-block-y" ref={drop} style={{ background: isOver ? "#4a4b2f" : "inherit" }}>
          {cardList}
        </ul>
        <a href='/' className="sm-btn primary-btn sticky">Create task</a>
      </div>
    </div >
  )
}

export default Column