import React, { useEffect, useState } from "react";

const ModalDetails = props => {

  const [task, setTask] = useState({})

  const getTask = async () => {
    try {
      const response = await fetch(`/api/v1/cards/1`)
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  return (
    <div>
      <h3></h3>
    </div>
  )
}

export default ModalDetails