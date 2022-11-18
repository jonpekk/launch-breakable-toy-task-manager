import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const ModalDetails = props => {

  const [task, setTask] = useState({
    name: "",
    status: "",
    description: "",
    card_attachment: { url: "" }
  })

  const getTask = async () => {
    try {
      const response = await fetch(`/api/v1/boards/${props.match.params.id}/cards/${props.cardID}`)
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        setTask(responseBody)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  return (
    <div className="card-detail-container">
      <h3>{task.name}</h3>
      <h4>Description</h4>
      <div className="description-container">
        <p>{task.description}</p>
      </div>
      <p className="eyebrow">Status: {task.status.replace('_', '-').toUpperCase()}</p>
      <div className="attachment-section">
        <h4>Attachment</h4>
        <img className="detail-image" src={task.card_attachment.url} />
      </div>
    </div>
  )
}

export default withRouter(ModalDetails)