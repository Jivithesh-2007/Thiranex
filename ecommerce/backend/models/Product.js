const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: 0, min: 0 },
    category: { type: String, required: true, index: true },
    image: { type: String, default: '' },
    images: [{ type: String }],
    brand: { type: String, default: '' },
    stock: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    sku: { type: String, unique: true, sparse: true, default: '' },
    specifications: {
      color: { type: String, default: '' },
      size: { type: String, default: '' },
      weight: { type: String, default: '' },
      dimensions: { type: String, default: '' },
    },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.pre('save', function syncStockFlag(next) {
  this.inStock = this.stock > 0;
  next();
});

module.exports = mongoose.model('Product', productSchema);
