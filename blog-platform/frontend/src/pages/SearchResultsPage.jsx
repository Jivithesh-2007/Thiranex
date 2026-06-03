import React, { useState } from "react";
import { postService } from "../services/postService";
import PostCard from "../components/PostCard";
import "../styles/SearchResults.css";

const SearchResultsPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await postService.searchPosts({ q: query });
      setResults(response.posts);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results-page">
      <div className="container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {searched && (
          <>
            <h2>
              {loading
                ? "Searching..."
                : `Found ${results.length} results${query ? ` for "${query}"` : ""}`}
            </h2>

            {loading ? (
              <p>Loading results...</p>
            ) : results.length === 0 ? (
              <p>No posts found. Try a different search term.</p>
            ) : (
              <div className="results-list">
                {results.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
