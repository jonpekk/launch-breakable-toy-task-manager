import React, { useEffect, useState } from 'react'
import BoardList from './BoardList';

export const App = (props) => {
  const [userInfo, setUserInfo] = useState({
    user: "",
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
    <BoardList userInfo={userInfo} />
  )
}

export default App
