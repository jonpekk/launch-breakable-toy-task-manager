import React from "react";
import { Link, Redirect, Route } from "react-router-dom";

const BoardTile = ({ name, shortcode, description, user, id }) => {

  return (
    <li className='board-tile cell large-4 medium-6 small-12'>
      <Link to={`/boards/${id}`}>
        <h2 className='lg-header positive'>Project: {name}</h2>
        <h3 className='eyebrow positive'>{shortcode}</h3>
        <div className='tile-body'>
          <p><span>Project description:</span> {description}</p>
          <p><span>Project Owner:</span> {user.email}</p>
        </div>
      </Link>
    </li>
  )
}

export default BoardTile