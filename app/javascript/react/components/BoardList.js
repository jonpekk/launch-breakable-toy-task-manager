import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoardTile from './BoardTile';

const BoardList = ({ userInfo }) => {

  const [boards, setBoards] = useState([])

  const getBoards = async () => {
    try {
      const response = await fetch('/api/v1/boards')
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        setBoards(responseBody)
      }

    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  useEffect(() => {
    getBoards()
  }, [])

  if (userInfo === null) {
    return (
      <div className="error-message alone">
        <p className=''>Hi! Looks like you either aren't logged in or are not signed into the correct account. Please sign in or sign up to create a board!</p>
        <Link className="sm-btn negative-btn" to='/users/sign-in'>Sign in!</Link>
      </div>
    )
  } else {
    const boardList = boards.map((board) => {
      return (
        <BoardTile
          name={board.name}
          shortcode={board.shortcode}
          description={board.description}
          user={board.user}
          key={board.id}
          id={board.id}
        />
      )
    })

    return (
      <Fragment>
        <h2>Welcome!</h2>
        <ul className='board-index-container grid-x grid-margin-x'>
          {boardList}
        </ul>
      </Fragment>)
  }
}

export default BoardList