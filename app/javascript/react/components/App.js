import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BoardList from './BoardList';
import SignIn from './SignIn';

export const App = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    boards: []
  })

  const getUser = async () => {
    try {
      const response = await fetch('api/v1/current-user')
      if (!response.ok) {
        const errorMessage = `${response.status} - ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        setUserInfo(responseBody)
      }

    } catch (err) {
      console.log(`Error! ${err}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <BoardList userInfo={userInfo} />
        </Route>
        <Route exact path="/users/sign-in">
          <SignIn userInfo={userInfo} />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}

export default App
