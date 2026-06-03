import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useBlog } from "../hooks/useBlog";
import { postService } from "../services/postService";
import "../styles/CreatePost.css";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useBlog();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);

  if (user?.role !== "writer") {
    return (
      <div className="container">
        <div className="alert alert-error">
          Only writers can create posts
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, status = "draft") => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      showToast("Title, content, and category are required", "error");
      return;
    }

    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        status,
      };

      const response = await postService.createPost(data);
      showToast("Post created successfully", "success");

      if (status === "published") {
        navigate(`/post/${response.post.slug}`);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      showToast(error.message || "Failed to create post", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <div className="container">
        <h1>Create New Post</h1>

        <form className="post-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Post title"
              maxLength="200"
              required
            />
            <small>{formData.title.length}/200</small>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, web"
            />
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content..."
              rows="15"
              required
            />
          </div>

          <div className="form-group">
            <label>Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short excerpt (optional)"
              rows="3"
              maxLength="300"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={loading}
            >
              Save Draft
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e, "published")}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
