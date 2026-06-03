import { createContext, useEffect, useMemo, useState } from 'react';
import { productService } from '../services/productService';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', minPrice: 0, maxPrice: 10000, rating: '', sort: 'newest', page: 1, limit: 12, q: '' });
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  const loadProducts = async (nextFilters = filters) => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) params.set(key, value);
    });
    const data = await productService.list(`?${params.toString()}`);
    setProducts(data.products);
    setMeta({ total: data.total, pages: data.pages });
    setLoading(false);
  };

  useEffect(() => {
    productService.categories().then((data) => setCategories(data.categories)).catch(() => setCategories([]));
    loadProducts(filters).catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = async (query) => {
    setLoading(true);
    const data = await productService.search(query);
    setProducts(data.products);
    setMeta({ total: data.products.length, pages: 1 });
    setLoading(false);
  };

  const setFilterValue = (key, value) => setFilters((current) => ({ ...current, [key]: value, page: key === 'page' ? value : 1 }));

  const value = useMemo(
    () => ({ products, categories, selectedProduct, setSelectedProduct, loading, filters, setFilterValue, loadProducts, search, meta }),
    [products, categories, selectedProduct, loading, filters, meta]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
