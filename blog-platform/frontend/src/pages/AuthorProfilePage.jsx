import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/userService";
import PostCard from "../components/PostCard";
import "../styles/AuthorProfile.css";

const AuthorProfilePage = () => {
  const { userId } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthorAndPosts();
  }, [userId]);

  const fetchAuthorAndPosts = async () => {
    try {
      setLoading(true);
      const [authorData, postsData] = await Promise.all([
        userService.getUserProfile(userId),
        userService.getUserPosts(userId, { limit: 10 }),
      ]);
      setAuthor(authorData);
      setPosts(postsData.posts);
    } catch (error) {
      console.error("Failed to load author:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!author) return <div className="container"><p>Author not found</p></div>;

  return (
    <div className="author-profile-page">
      <div className="container">
        <div className="author-header">
          {author.avatar && (
            <img src={author.avatar} alt={author.name} className="author-avatar-large" />
          )}

          <div className="author-info">
            <h1>{author.name}</h1>
            <p className="author-bio">{author.bio}</p>

            <div className="author-stats">
              <div className="stat">
                <span className="number">{author.postCount || 0}</span>
                <span className="label">Posts</span>
              </div>
              <div className="stat">
                <span className="number">{author.followerCount || 0}</span>
                <span className="label">Followers</span>
              </div>
              <div className="stat">
                <span className="label">Member Since</span>
                <span>{new Date(author.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {author.socialLinks && Object.keys(author.socialLinks).length > 0 && (
              <div className="social-links">
                {author.socialLinks.twitter && (
                  <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
                {author.socialLinks.github && (
                  <a href={author.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {author.socialLinks.linkedin && (
                  <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="author-posts">
          <h2>Posts by {author.name}</h2>
          {posts.length === 0 ? (
            <p>No posts yet</p>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfilePage;
