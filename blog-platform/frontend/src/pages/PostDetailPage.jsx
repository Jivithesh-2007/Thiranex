import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { postService } from "../services/postService";
import { userService } from "../services/userService";
import CommentSection from "../components/CommentSection";
import "../styles/PostDetail.css";

const PostDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPostBySlug(slug);
      setPost(response);

      // Fetch related posts
      if (response.category) {
        const related = await postService.getPosts({
          category: response.category,
          limit: 3,
        });
        setRelatedPosts(related.posts.filter((p) => p._id !== response._id));
      }
    } catch (error) {
      console.error("Failed to load post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!post) return <div className="container"><p>Post not found</p></div>;

  const readTime = Math.ceil((post.content?.replace(/<[^>]*>/g, "").length || 0) / 1000);

  return (
    <div className="post-detail-page">
      <div className="container">
        <article className="post-detail">
          {post.featuredImage && (
            <img src={post.featuredImage} alt={post.title} className="featured-image" />
          )}

          <header className="post-header">
            <h1>{post.title}</h1>

            <div className="post-meta-info">
              <div className="author-info">
                {post.authorId?.avatar && (
                  <img src={post.authorId.avatar} alt={post.authorId.name} />
                )}
                <div>
                  <a href={`/author/${post.authorId?._id}`} className="author-name">
                    {post.authorId?.name}
                  </a>
                  <div className="post-dates">
                    <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                    {post.updatedAt !== post.publishedAt && (
                      <span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="post-stats">
                <span className="category-badge">{post.category}</span>
                <span>⏱️ {readTime} min read</span>
                <span>👁️ {post.viewCount} views</span>
              </div>
            </div>
          </header>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

          <footer className="post-footer">
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <a key={tag} href={`/tag/${tag}`} className="tag">
                    #{tag}
                  </a>
                ))}
              </div>
            )}

            <div className="post-actions">
              <div className="share-buttons">
                <button>📘 Facebook</button>
                <button>𝕏 Twitter</button>
                <button>💼 LinkedIn</button>
              </div>
            </div>
          </footer>

          <CommentSection postId={post._id} />
        </article>

        {relatedPosts.length > 0 && (
          <aside className="related-posts">
            <h3>Related Posts</h3>
            <div className="posts-grid">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost._id} className="related-post-card">
                  <a href={`/post/${relatedPost.slug}`}>
                    <h4>{relatedPost.title}</h4>
                  </a>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
