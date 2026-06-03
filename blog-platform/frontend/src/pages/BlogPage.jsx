import React, { useState, useEffect } from "react";
import { postService } from "../services/postService";
import PostCard from "../components/PostCard";
import "../styles/BlogPage.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-createdAt");

  useEffect(() => {
    fetchPosts();
  }, [currentPage, category, sort]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getPosts({
        page: currentPage,
        limit: 10,
        category: category || undefined,
        sort,
      });
      setPosts(response.posts);
      setTotalPages(response.pages);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <h1>Blog</h1>
          <p>Explore our latest articles and insights</p>
        </div>

        <div className="blog-content">
          <div className="posts-section">
            <div className="filters">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="-createdAt">Newest First</option>
                <option value="-viewCount">Most Viewed</option>
                <option value="-commentCount">Most Commented</option>
              </select>

              <select value={category} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
              </select>
            </div>

            {loading ? (
              <div className="loading">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="no-posts">No posts found</div>
            ) : (
              <>
                <div className="posts-list">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="blog-sidebar">
            <div className="sidebar-card">
              <h3>Popular Posts</h3>
              <div className="popular-list">
                <a href="#">React Hooks Guide</a>
                <a href="#">Express Middleware</a>
                <a href="#">Web Design Trends</a>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Newsletter</h3>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
