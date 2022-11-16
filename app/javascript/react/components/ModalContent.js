import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const ModalContent = (props) => {

  const [formFields, setFormFields] = useState({
    name: "",
    board: props.match.params.id
  })

  const createTask = async (payload) => {
    try {
      const response = await fetch('/api/v1/cards', {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      })
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(`Error! ${errorMessage}`)
        throw (error)
      } else {
        const responseBody = await response.json()
        props.setBoard(responseBody)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createTask(formFields)
    props.handleClose()
  }

  const handleInput = event => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className="columns editor-section-right">
      <div className="form-header">
        <h2 className="md-header">Create Task</h2>
        <button className="close-button" onClick={props.handleClose} title="Close Editor">x</button>
      </div>
      <form className="editor-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Task name</label>
        <input id="name" className="input-field" name="name" type="text" value={formFields.name} placeholder="Task Title Here!" onChange={handleInput} />
        <div className="editor-form-actions">
          <input type="submit" className="sm-btn primary-btn" value="Send it" />
          <input type="button" onClick={props.handleClose} className="sm-btn" value="discard" />
        </div>
      </form>
    </div>
  )
}

export default withRouter(ModalContent)