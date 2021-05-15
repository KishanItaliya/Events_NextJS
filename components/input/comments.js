import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import styles from "../../styles/comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/comments/" + eventId)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 201) {
          toast.success("Comment added successfully...");
        }
        if (response.status == 500) {
          toast.error("Internal Server Error...");
        }
        response.json();
      })
      .then((data) => console.log(data));
  }

  return (
    <section className={styles.comments}>
      <ToastContainer autoClose={3000} />

      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
