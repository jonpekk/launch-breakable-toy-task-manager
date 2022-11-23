import React, { Fragment, useEffect } from "react";
import BoardTile from "../board-list/BoardTile";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  currentProfile,
  setUserThunk
} from './userSlice';

const Profile = props => {
  const profile = useSelector(currentProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserThunk(props.match.params.id))
  }, [])

  const boardList = profile.boards.map(board => {
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
      <p>Something went wrong, please login to view this page</p>
    )
  } else if (props.userInfo == undefined) {
    return (
      <p>Loading</p>
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