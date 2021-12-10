import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  id: { type: Number,default: 999, required: true },
  // name: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
