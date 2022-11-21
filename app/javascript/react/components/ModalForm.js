import React, { Fragment, useState } from "react";
import ErrorList from "./ErrorList";
import _ from 'lodash'
import Dropzone from "react-dropzone";
import { withRouter } from "react-router-dom";


const ModalForm = (props) => {

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    card_attachment: {},
    status: props.activeColumn
  })
  const [errors, setErrors] = useState({})

  const getStatusOptions = (columns) => {
    const statusOptions = columns.map((option) => {
      return (
        <option value={option} key={option}>{option}</option>
      )
    })
    return statusOptions
  }

  const handleFileUpload = (acceptedFiles) => {
    setFormFields({
      ...formFields,
      card_attachment: acceptedFiles[0]
    })
  }

  const createTask = async () => {
    let body = new FormData()
    body.append("card_attachment", formFields.card_attachment)
    body.append("name", formFields.name)
    body.append("description", formFields.description)
    body.append("status", formFields.status.replace('-', '_').toLowerCase())

    try {
      const response = await fetch(`/api/v1/boards/${props.match.params.id}/cards`, {
        credentials: "same-origin",
        method: "POST",
        body: body,
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
    if (validateForm(formFields)) {
      createTask()
      props.handleClose()
    }
  }

  const validateForm = (fields) => {
    let submitErrors = {}
    if (fields.name.trim() === "") {
      submitErrors = {
        ...submitErrors,
        name: "The task title must be between 5 and 50 characters"
      }
    }
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleInput = event => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <Fragment>
      <ErrorList errors={errors} />
      <h2 className="sm-header positive">New Task Form</h2>
      <form className="editor-form" onSubmit={handleSubmit}>
        <div className="grid-x">
          <div className="input-container large-7 medium-12 small-12">
            <label htmlFor="name">Task name</label>
            <input id="name" className="input-field" name="name" type="text" value={formFields.name} placeholder="Task Title Here!" onChange={handleInput} />
          </div>
          <div className="input-container large-3 medium-12 small-12 large-offset-1">
            <label htmlFor="status">Status</label>
            <select name="status" className="input-field" id="status" onChange={handleInput} value={formFields.status}>
              {getStatusOptions(props.columns)}
            </select>
          </div>
        </div>
        <label htmlFor="description">Description</label>
        <textarea name="description" rows="10" onChange={handleInput} value={formFields.description}></textarea>
        <Dropzone onDrop={handleFileUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <p>Attachment: {formFields.card_attachment.name}</p>
        <div className="editor-form-actions">
          <input type="submit" className="sm-btn primary-btn" value="Send it" />
          <input type="button" onClick={props.handleClose} className="sm-btn" value="discard" />
        </div>
      </form>
    </Fragment>
  )
}

export default withRouter(ModalForm)