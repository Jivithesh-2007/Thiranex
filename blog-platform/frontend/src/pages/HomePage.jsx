import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postService } from "../services/postService";
import PostCard from "../components/PostCard";
import "../styles/HomePage.css";

const HomePage = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const response = await postService.getPosts({
        limit: 5,
        sort: "-viewCount",
      });
      setFeaturedPosts(response.posts);
    } catch (error) {
      console.error("Failed to load featured posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to TechBlog</h1>
          <p>Discover insightful articles about technology, programming, and web development</p>
          <Link to="/blog" className="btn btn-primary btn-lg">
            Read Latest Posts
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="featured-posts container">
        <h2>Featured Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : featuredPosts.length === 0 ? (
          <p>No posts available yet</p>
        ) : (
          <div className="posts-grid">
            {featuredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="categories container">
        <h2>Explore Categories</h2>
        <div className="categories-grid">
          {[
            { name: "Technology", icon: "💻" },
            { name: "Programming", icon: "👨‍💻" },
            { name: "Web Development", icon: "🌐" },
            { name: "JavaScript", icon: "📜" },
            { name: "React", icon: "⚛️" },
            { name: "Other", icon: "📚" },
          ].map((cat) => (
            <Link key={cat.name} to={`/category/${cat.name.toLowerCase().replace(" ", "-")}`} className="category-card">
              <span className="icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Start Your Writing Journey</h2>
          <p>Share your knowledge with our community</p>
          <Link to="/signup?role=writer" className="btn btn-primary">
            ✍️ Become a Writer
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
