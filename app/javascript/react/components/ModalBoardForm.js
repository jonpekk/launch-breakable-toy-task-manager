import React, { Fragment, useState } from "react";
import ErrorList from "./ErrorList";
import _ from 'lodash'

const ModalBoardForm = (props) => {

  const [boardFields, setBoardFields] = useState({
    name: "",
    shortcode: "",
    description: ""
  })
  const [errors, setErrors] = useState([])

  const validateForm = (fields) => {
    let submitErrors = {}
    if (fields.name.trim() === "" || fields.name.trim().length > 50 || fields.name.trim().length < 5) {
      submitErrors = {
        ...submitErrors,
        name: "The task title must be between 5 and 50 characters"
      }
    }

    if (fields.shortcode.trim() === "" || fields.shortcode.trim().length < 2 || fields.shortcode.trim().length > 4) {
      submitErrors = {
        ...submitErrors,
        shortcode: "The Board shortcode must be in between 2-4 characters"
      }
    }

    if (fields.description.trim().length > 240) {
      submitErrors = {
        ...submitErrors,
        description: "Keep your description under 240 characters!"
      }
    }

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const createBoard = async (payload) => {
    try {
      const response = await fetch(`/api/v1/boards`, {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(payload),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const responseBody = await response.json()
        props.setNewBoardRedirect(responseBody.id)
      }

    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validateForm(boardFields)) {
      createBoard(boardFields)
      props.handleClose()
    }
  }

  const handleInput = (event) => {
    setBoardFields({
      ...boardFields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <Fragment>
      <ErrorList errors={errors} />
      <h2>New Board Form</h2>
      <form className="editor-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Board name</label>
        <input id="name" className="input-field" name="name" type="text" value={boardFields.name} onChange={handleInput} />

        <label htmlFor="shortcode">Shortcode (2-4 characters)</label>
        <input id="shortcode" className="input-field" name="shortcode" type="text" value={boardFields.shortcode} onChange={handleInput} />

        <label htmlFor="description">Description</label>
        <input id="description" className="input-field" name="description" type="text" value={boardFields.description} onChange={handleInput} />
        <div className="editor-form-actions">
          <input type="submit" className="sm-btn primary-btn" value="Send it" />
          <input type="button" onClick={props.handleClose} className="sm-btn" value="discard" />
        </div>
      </form>
    </Fragment>
  )
}

export default ModalBoardForm