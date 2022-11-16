import React, { Fragment, useEffect, useState } from "react"
import { withRouter, Link, Redirect } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import _ from 'lodash'
import Column from "./Column";

const Board = (props) => {

  if (props.userInfo === null) {
    return <Redirect to='/' />
  }

  const [board, setBoard] = useState({
    user: {},
    cards: []
  })

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
        <p className=''>Woops! You don't have access to that board! Please sign in to the correct account or to to the homepage to see what boards you have access to</p>
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
      <Column name={column} cards={cards} key={column} setBoard={setBoard} />
    )
  })

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="top-body-section">
        <h2 className="sm-header">{board.name}</h2>
      </section>
      <ul className="board-container grid-margin-x grid-x cell-block grid-frame">
        {columnList}
      </ul>
    </DndProvider>
  )
}

export default withRouter(Board)