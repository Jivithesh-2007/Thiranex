const Product = require('../models/Product');

const buildQuery = (query) => {
  const filter = {};

  if (query.category) filter.category = query.category;
  if (query.inStock === 'true') filter.stock = { $gt: 0 };
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  if (query.rating) filter.rating = { $gte: Number(query.rating) };

  if (query.q) {
    filter.$or = [
      { name: { $regex: query.q, $options: 'i' } },
      { description: { $regex: query.q, $options: 'i' } },
      { brand: { $regex: query.q, $options: 'i' } },
    ];
  }

  return filter;
};

const getSort = (sort) => {
  switch (sort) {
    case 'priceAsc':
      return { price: 1 };
    case 'priceDesc':
      return { price: -1 };
    case 'topRated':
      return { rating: -1, ratingCount: -1 };
    case 'bestSellers':
      return { ratingCount: -1, featured: -1 };
    case 'newest':
    default:
      return { createdAt: -1 };
  }
};

const getProducts = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
  const filter = buildQuery(req.query);
  const sort = getSort(req.query.sort);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  res.json({
    products,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ product });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ message: 'Product deleted' });
};

const searchProducts = async (req, res) => {
  req.query.q = req.query.q || '';
  const products = await Product.find(buildQuery(req.query)).limit(20).sort({ createdAt: -1 });
  res.json({ products });
};

const getCategories = async (req, res) => {
  const categories = await Product.distinct('category');
  res.json({ categories: categories.sort() });
};

const getRelatedProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4).sort({ rating: -1 });
  res.json({ products: related });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getCategories,
  getRelatedProducts,
};
