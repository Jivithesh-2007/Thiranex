import React from "react";
import { Link } from "react-router-dom";
import "../styles/PostCard.css";

const PostCard = ({ post }) => {
  const readTime = Math.ceil((post.content?.replace(/<[^>]*>/g, "").length || 0) / 1000);

  return (
    <article className="post-card">
      {post.featuredImage && (
        <Link to={`/post/${post.slug}`} className="post-image">
          <img src={post.featuredImage} alt={post.title} />
        </Link>
      )}

      <div className="post-content">
        <div className="post-meta">
          <span className="category-tag">{post.category}</span>
          <span className="read-time">⏱️ {readTime} min read</span>
        </div>

        <Link to={`/post/${post.slug}`} className="post-title">
          <h2>{post.title}</h2>
        </Link>

        <p className="post-excerpt">{post.excerpt}</p>

        <div className="post-footer">
          <div className="author-info">
            {post.authorId?.avatar && (
              <img
                src={post.authorId.avatar}
                alt={post.authorId.name}
                className="author-avatar"
              />
            )}
            <div>
              <Link to={`/author/${post.authorId?._id}`} className="author-name">
                {post.authorId?.name}
              </Link>
              <time className="post-date">
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </div>
          </div>

          <div className="post-stats">
            <span>👁️ {post.viewCount}</span>
            <span>💬 {post.commentCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
