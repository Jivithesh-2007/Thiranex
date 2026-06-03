import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { commentService } from "../services/commentService";
import "../styles/CommentForm.css";

const CommentForm = ({ postId, parentCommentId = null, onSuccess, onCancel, isReply = false }) => {
  const { user, isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if (!isAuthenticated) {
      setError("You must be logged in to comment");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await commentService.createComment(postId, {
        content: content.trim(),
        parentCommentId: parentCommentId || undefined,
      });

      setContent("");
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="comment-login-prompt">
        <p>Please <a href="/login">login</a> to leave a comment</p>
      </div>
    );
  }

  return (
    <form className={`comment-form ${isReply ? "reply-form" : ""}`} onSubmit={handleSubmit}>
      <div className="comment-author">
        {user?.avatar && <img src={user.avatar} alt={user.name} />}
        <span>{user?.name}</span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={isReply ? "Write a reply..." : "Leave a comment..."}
        rows={isReply ? 2 : 4}
        className="comment-textarea"
      />

      {error && <div className="comment-error">{error}</div>}

      <div className="comment-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Posting..." : isReply ? "Reply" : "Comment"}
        </button>
        {isReply && <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>}
      </div>
    </form>
  );
};

export default CommentForm;
