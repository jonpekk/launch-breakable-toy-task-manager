import React, { useState } from "react";
import Card from './Card'

const Column = ({ name, cards }) => {

  const [columnCards, setColumnCards] = useState(cards)

  const cardList = columnCards.map(card => {
    return (
      <Card
        key={card.id}
        name={card.name}
        status={card.status}
      />
    )
  })

  return (
    <div className="todo-list-card card cell large-3 small-8">
      <div className="card-divider">
        <h3>{name}</h3>
      </div>
      <div className="card-section grid-y grid-margin-y grid-frame">
        <ul className="cell cell-block-y data-sticky-container">
          {cardList}
        </ul>
        <a href='/' className="sm-btn primary-btn sticky">Create task</a>
      </div>
    </div>
  )
}

export default Column