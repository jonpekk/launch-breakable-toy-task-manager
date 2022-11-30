import React, { Fragment, useEffect, useReducer } from "react";
import BoardTile from "./BoardTile";
import { withRouter } from "react-router-dom";

const ACTIONS = {
  GET_BOARDS: 'get-boards'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_BOARDS:
      return action.payload.boards
  }
}

const Profile = props => {

  const [userBoards, dispatch] = useReducer(reducer, [])

  const getUserBoards = async () => {
    try {
      const response = await fetch(`/api/v1/current-user`)
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        dispatch({ type: ACTIONS.GET_BOARDS, payload: responseBody })
      }

    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  useEffect(() => {
    getUserBoards()
  }, [])

  const boardList = userBoards.map(board => {
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

  if (props.userInfo == null) {
    return (
      <p>Loading</p>
    )
  } else if (props.userInfo == undefined) {
    return (
      <p>Something went wrong, please login to view this page</p>
    )
  } else {
    return (
      <Fragment>
        <h2 className="small-header positive">Hello {props.userInfo.email}!</h2>
        <h2 className="small-header positive">Here are the boards you own</h2>
        <ul className="grid-x grid-margin-x">
          {boardList}
        </ul>
      </Fragment>
    )
  }
}


export default withRouter(Profile)