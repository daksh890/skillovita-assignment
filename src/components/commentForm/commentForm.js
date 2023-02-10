import React, { useState } from "react";
import "./comentForm.css";

function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) {
  const [text, setText] = useState(initialText);
  const [show, setShow] = useState(false);
  // console.log(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (e) => {
    e.preventDefault();
    if (text.length > 200) {
      setShow(true);
      return;
    }
    setShow(false);
    handleSubmit(text);
    setText("");
  };

  return (
    <div className="comment-formarea">
      {show && <p>Comment should be less than 200 characters.</p>}
      <form onSubmit={onSubmit}>
        <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="forms-buttons">
          <button className="comment-form-button" disabled={isTextareaDisabled}>
            {submitLabel}
          </button>
          {hasCancelButton && (
            <button
              className="comment-form-button form-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
