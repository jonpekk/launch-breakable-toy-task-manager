import React from "react";
import _ from 'lodash'

const ErrorList = ({ errors }) => {
  const errantFields = Object.keys(errors)
  if (errantFields.length > 0) {
    let index = 0
    const listItems = errantFields.map(field => {
      index++
      return (
        <li key={index}>
          {_.startCase(field)} field: {errors[field]}
        </li>
      )
    })
    return (
      <div >
        <ul className="error-message ">{listItems}</ul>
      </div>
    )
  } else {
    return ""
  }
}

export default ErrorList