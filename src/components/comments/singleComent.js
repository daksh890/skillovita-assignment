import React from "react";
import "./single.css";
import Rams from "../Assets/Users/rams.png";
import CommentForm from "../commentForm/commentForm";

function SingleComent({
  comment,
  replies,
  getReplies,
  currentUserId,
  addComment,
  UpdateComment,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
}) {
  //   console.log(comment);
  const createdAt = new Date(comment.createdAt).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  // const replyId = parentId ? parentId : comment.id;
  const replyId = comment.id;

  return (
    <div>
      <div className="comment">
        <div className="user-img">
          <img src={Rams} width="40px" />
        </div>
        <div className="content">
          <div className="username">
            <h4>{comment.username}</h4>
            <p>{createdAt}</p>
          </div>
          <div className="comment-text">
            {!isEditing && <p>{comment.body}</p>}
            {isEditing && (
              <CommentForm
                submitLabel="Update"
                hasCancelButton
                initialText={comment.body}
                handleSubmit={(text) => UpdateComment(text, comment.id)}
                handleCancel={() => setActiveComment(null)}
              />
            )}
          </div>
          <div className="comment-actions">
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          handleSubmit={(text) => addComment(text, replyId)}
        />
      )}

      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <SingleComent
              comment={reply}
              key={reply.id}
              replies={getReplies(reply.id)}
              getReplies={getReplies}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              UpdateComment={UpdateComment}
              parentId={comment.id}
              addComment={addComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SingleComent;
