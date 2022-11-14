import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BoardTile from './BoardTile';

const BoardList = ({ userInfo }) => {

  if (!userInfo) {
    return (
      <div className="error-message alone">
        <p className=''>Hi! Looks like you either aren't logged in or are not signed into the correct account. Please sign in or sign up to create a board!</p>
        <Link className="sm-btn negative-btn" to='/users/sign-in'>Sign in!</Link>
      </div>
    )
  } else {
    let boardList = userInfo.boards.map((board) => {
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
        <h2>Welcome {userInfo.email}!</h2>
        <ul className='board-index-container grid-x grid-margin-x'>
          {boardList}
        </ul>
      </Fragment>)
  }
}

export default BoardList