import React, { useEffect, useState } from "react"
import { Redirect, withRouter, Link } from "react-router-dom";
import _ from 'lodash'

const Board = (props) => {

  const [board, setBoard] = useState({
    user: {}
  })

  if (!props.userInfo) {
    return <Redirect to="/" />
  }

  const getBoard = async () => {
    try {
      const response = await fetch('/api/v1/boards/1')
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

  if (board.user.id !== props.userInfo.id) {
    return (
      <div className="error-message alone">
        <p className=''>Woops! You don't have access to that board! Please sign in to the correct account or to to the homepage to see what boards you have access to</p>
        <div className="error-buttons">
          <Link className="sm-btn negative-btn" to='/users/sign-in'>Sign in!</Link>
          <Link className="sm-btn negative-btn" to='/'>Take me home!</Link>
        </div>
      </div>
    )
  }

  return (
    <p>Something</p>
  )
}

export default withRouter(Board)