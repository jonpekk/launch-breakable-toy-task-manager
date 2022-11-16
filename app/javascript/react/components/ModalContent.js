import React from "react";

const ModalContent = () => {

  return (
    <div className="card-editor-container">
      <div className="columns card-editor-section-right">
        <h2 className="md-header">Create/Edit ticket #101</h2>
        <form className="card-editor-form">
          <input type="text" placeholder="Task title" />
          <textarea name="description" id="" rows="10" placeholder="Type your description here"></textarea>
          <div className="card-editor-form-actions">
            <div>
              <label htmlFor="FileUpload" className="button card-editor-file-button">Attach Files</label>
              <input type="file" id="FileUpload" className="show-for-sr" />
            </div>
            <input type="submit" className="button" value="Send it" />
            <input type="button" className="button" value="discard" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalContent