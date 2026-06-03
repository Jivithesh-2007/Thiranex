export default function FilterSidebar({ categories = [], filters, setFilterValue, onApply }) {
  return (
    <aside className="filters-panel">
      <h3>Filters</h3>
      <label>
        Category
        <select value={filters.category} onChange={(e) => setFilterValue('category', e.target.value)}>
          <option value="">All</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <label>
        Price max: ${Number(filters.maxPrice).toLocaleString()}
        <input type="range" min="0" max="10000" value={filters.maxPrice} onChange={(e) => setFilterValue('maxPrice', Number(e.target.value))} />
      </label>
      <label>
        Minimum rating
        <select value={filters.rating} onChange={(e) => setFilterValue('rating', e.target.value)}>
          <option value="">Any</option>
          <option value="4">4 stars & up</option>
          <option value="5">5 stars</option>
        </select>
      </label>
      <label className="checkbox-row">
        <input type="checkbox" checked={filters.inStock === 'true'} onChange={(e) => setFilterValue('inStock', e.target.checked ? 'true' : '')} /> In stock only
      </label>
      <label>
        Sort by
        <select value={filters.sort} onChange={(e) => setFilterValue('sort', e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="bestSellers">Best Sellers</option>
          <option value="topRated">Top Rated</option>
        </select>
      </label>
      <button className="btn btn-primary full" onClick={onApply}>Apply Filters</button>
    </aside>
  );
}
