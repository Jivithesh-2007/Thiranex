import React, { useState, useEffect } from "react";
import { commentService } from "../services/commentService";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "../styles/CommentSection.css";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("-createdAt");

  useEffect(() => {
    fetchComments();
  }, [postId, sortBy]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentService.getComments(postId, { sort: sortBy });
      setComments(response.comments || []);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="comments-section">
      <h3>Comments ({comments.length})</h3>

      <CommentForm postId={postId} onSuccess={fetchComments} />

      <div className="comments-sort">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
          <option value="-likeCount">Most Liked</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="no-comments">No comments yet. Be the first to comment!</div>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              postId={postId}
              onCommentUpdate={fetchComments}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentSection;
