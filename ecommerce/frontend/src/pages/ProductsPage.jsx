import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { useProduct } from '../hooks/useProduct';

export default function ProductsPage() {
  const [params] = useSearchParams();
  const { products, categories, filters, setFilterValue, loadProducts, loading, meta, search } = useProduct();

  useEffect(() => {
    const q = params.get('q');
    if (q) {
      search(q).catch(() => undefined);
    } else {
      loadProducts(filters).catch(() => undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.toString()]);

  return (
    <main className="container section products-page">
      <div className="section-heading">
        <h1>Products</h1>
        <p>{meta.total} items found</p>
      </div>
      <div className="products-layout">
        <FilterSidebar categories={categories} filters={filters} setFilterValue={setFilterValue} onApply={() => loadProducts(filters)} />
        <div>
          <div className="products-toolbar">
            <label>
              Per page
              <select value={filters.limit} onChange={(e) => setFilterValue('limit', Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
            <button className="btn btn-ghost" onClick={() => loadProducts(filters)}>Refresh</button>
          </div>
          <ProductGrid products={products} loading={loading} />
          <div className="pagination">
            <button className="btn btn-ghost" disabled={filters.page <= 1} onClick={() => { const next = Math.max(1, filters.page - 1); setFilterValue('page', next); loadProducts({ ...filters, page: next }); }}>Prev</button>
            <span>Page {filters.page} of {meta.pages}</span>
            <button className="btn btn-ghost" disabled={filters.page >= meta.pages} onClick={() => { const next = Math.min(meta.pages, filters.page + 1); setFilterValue('page', next); loadProducts({ ...filters, page: next }); }}>Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
