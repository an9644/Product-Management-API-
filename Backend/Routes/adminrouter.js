import { Router } from "express";
import { authenticate } from "../Middleware/auth.js"; 
import dotenv from 'dotenv';
import { User, Product } from '../Models/user.js'; 

dotenv.config();

const adminRouter = Router();

function isAdmin(req, res, next) {
  if (req.userType !== 'admin') {
    return res.status(403).json({ message: "Access denied: You are not an admin" });
  }
  next();
}

adminRouter.get('/products', authenticate, isAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

adminRouter.get('/product/:productId', authenticate, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

adminRouter.put('/product/:productId', authenticate, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category } = req.body;

    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

adminRouter.delete('/product/:productId', authenticate, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete the product
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { adminRouter };
