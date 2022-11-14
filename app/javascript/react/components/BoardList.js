import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BoardTile from './BoardTile';

const BoardList = ({ userInfo }) => {

  if (!userInfo) {
    return (
      <div className="error-message">
        <p className=''>Hi! Looks like you either aren't logged in or don't have an account with us. Please sign in or sign up to create a board!</p>
        <Link className="sm-btn negative-btn" to='/users/sign-in'>Sign in!</Link>
      </div>
    )
  } else {
    const boardList = userInfo.boards.map((board) => {
      return (<BoardTile
        name={board.name}
        shortcode={board.shortcode}
        description={board.description}
        user={board.user}
        key={board.id}
      />)

    })

    return (
      <Fragment>
        <h2>Welcome {userInfo.email}!</h2>
        <div className='board-index-container grid-x grid-margin-x'>
          {boardList}
        </div>
      </Fragment>)
  }

}


export default BoardList