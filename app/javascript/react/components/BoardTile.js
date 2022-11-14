import React from "react";

const BoardTile = ({ name, shortcode, description, user }) => {
  console.log(name)
  return (
    <div className='board-tile cell large-4 medium-6 small-12'>
      <h2 className='lg-header positive'>Project: {name}</h2>
      <h3 className='eyebrow positive'>{shortcode}</h3>
      <div className='tile-body'>
        <p><span>Project description:</span> {description}</p>
        <p><span>Project Owner:</span> {user.email}</p>
      </div>
    </div>
  )
}

export default BoardTile