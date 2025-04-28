import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  });
  
export const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    productId: { type: String, unique: true },
    name: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10, maxlength: 50 },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, lowercase: true, required: true },
    createdBy: { type: String, required: true }
});
  
export const Product = mongoose.model('Product', productSchema);

const wishlistSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    products: [{ type: String }] 
});
  
export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
