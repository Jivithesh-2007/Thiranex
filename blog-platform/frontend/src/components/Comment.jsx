import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { commentService } from "../services/commentService";
import CommentForm from "./CommentForm";
import "../styles/Comment.css";

const Comment = ({ comment, postId, onCommentUpdate }) => {
  const { user, isAuthenticated } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [liked, setLiked] = useState(
    comment.likes?.some((like) => like._id === user?.id) || false
  );
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);

  const isAuthor = user?.id === comment.authorId?._id;

  const handleLike = async () => {
    try {
      await commentService.likeComment(comment._id);
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await commentService.deleteComment(comment._id);
      onCommentUpdate?.();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="comment-thread">
      <div className="comment">
        <div className="comment-header">
          <div className="comment-author-info">
            {comment.authorId?.avatar && (
              <img src={comment.authorId.avatar} alt={comment.authorId.name} />
            )}
            <div>
              <Link to={`/author/${comment.authorId?._id}`} className="author-name">
                {comment.authorId?.name}
              </Link>
              <span className="comment-time">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {isAuthor && (
            <button className="delete-comment-btn" onClick={handleDelete}>
              ✕
            </button>
          )}
        </div>

        <p className="comment-text">{comment.content}</p>

        <div className="comment-actions">
          <button
            className={`like-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            👍 {likeCount}
          </button>
          <button
            className="reply-btn"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            💬 Reply
          </button>
        </div>

        {showReplyForm && (
          <CommentForm
            postId={postId}
            parentCommentId={comment._id}
            onSuccess={() => {
              setShowReplyForm(false);
              onCommentUpdate?.();
            }}
            onCancel={() => setShowReplyForm(false)}
            isReply={true}
          />
        )}
      </div>

      {comment.replies?.length > 0 && (
        <div className="comment-replies">
          {showReplies && (
            <div className="replies-list">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  postId={postId}
                  onCommentUpdate={onCommentUpdate}
                />
              ))}
            </div>
          )}
          {!showReplies && comment.replyCount > 0 && (
            <button
              className="show-replies-btn"
              onClick={() => setShowReplies(true)}
            >
              Show {comment.replyCount} replies
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
