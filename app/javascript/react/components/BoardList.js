import React, { Fragment } from "react";
import BoardTile from './BoardTile';

const BoardList = ({ userInfo }) => {

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

export default BoardList