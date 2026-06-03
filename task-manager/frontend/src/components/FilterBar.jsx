import React from 'react';
import '../styles/App.css';

/**
 * Filter and sort bar component
 */
export const FilterBar = ({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  search,
  onSearchChange
}) => {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label className="filter-label">Filter:</label>
          <div className="filter-buttons">
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => onFilterChange(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="sort" className="filter-label">Sort:</label>
          <select
            id="sort"
            className="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="date">Date (Newest First)</option>
            <option value="priority">Priority (High to Low)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
