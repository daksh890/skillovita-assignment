import React, { useEffect, useState } from "react";
import {
  getComments as getCommentsApi,
  createComment,
  destroyComment,
  updateCommentApi,
} from "../../utils/api";
import SingleComent from "./singleComent";
import CommentForm from "../commentForm/commentForm";

import "./comments.css";

function Comments({ currentUserId }) {
  const [backendComments, setBackendComments] = useState([]);
  const parentComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const [activeComment, setActiveComment] = useState(null);

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    console.log("comment", text, parentId);
    createComment(text, parentId).then((comment) => {
      const newCommentsList = [comment, ...backendComments];
      setBackendComments(newCommentsList);
      localStorage.setItem("comments", JSON.stringify(newCommentsList));
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      destroyComment(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
        localStorage.setItem(
          "comments",
          JSON.stringify(updatedBackendComments)
        );
      });
    }
  };

  const handleRefresh = () => {
    if (window.confirm("All Your Previous Data will be gone..")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const UpdateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      localStorage.setItem("comments", JSON.stringify(updatedBackendComments));
      setActiveComment(null);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("comments") === null) {
      getCommentsApi().then((data) => {
        console.log(data);
        setBackendComments(data);
        localStorage.setItem("comments", JSON.stringify(data));
      });
    } else {
      const val = localStorage.getItem("comments");
      const data = JSON.parse(val);
      setBackendComments(data);
      console.log("local Storage");
    }
  }, []);
  return (
    <div className="comments">
      <div className="refresh">
        <button className="refresh-btn" onClick={handleRefresh}>
          {" "}
          Refresh
        </button>
      </div>
      <div className="comment-form">
        <CommentForm submitLabel="Post" handleSubmit={addComment} />
      </div>
      <div className="comments-container">
        {parentComments.map((rootComment) => (
          <SingleComent
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            getReplies={getReplies}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            UpdateComment={UpdateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
