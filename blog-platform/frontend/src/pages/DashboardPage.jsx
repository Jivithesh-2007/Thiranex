import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { postService } from "../services/postService";
import "../styles/Dashboard.css";

const DashboardPage = () => {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getPosts({
        authorId: user.id,
        limit: 50,
      });
      setMyPosts(response.posts || []);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await postService.deletePost(id);
      setMyPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Dashboard</h1>

        <div className="dashboard-tabs">
          {user?.role === "writer" && (
            <button
              className={`tab ${activeTab === "posts" ? "active" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              📝 My Posts
            </button>
          )}
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>
        </div>

        {activeTab === "posts" && user?.role === "writer" && (
          <div className="posts-section">
            <div className="section-header">
              <h2>My Posts</h2>
              <a href="/write" className="btn btn-primary">
                ✍️ New Post
              </a>
            </div>

            {loading ? (
              <p>Loading posts...</p>
            ) : myPosts.length === 0 ? (
              <p>No posts yet. <a href="/write">Create your first post</a></p>
            ) : (
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myPosts.map((post) => (
                    <tr key={post._id}>
                      <td><a href={`/post/${post.slug}`}>{post.title}</a></td>
                      <td>{post.category}</td>
                      <td>
                        <span className={`status ${post.status}`}>
                          {post.status}
                        </span>
                      </td>
                      <td>{post.viewCount}</td>
                      <td>{post.commentCount}</td>
                      <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td>
                        <a href={`/edit/${post._id}`} className="btn-sm">Edit</a>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-section">
            <h2>Profile</h2>
            <div className="profile-info">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
              <p><strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
