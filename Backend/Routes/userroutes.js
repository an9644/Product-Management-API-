import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Product } from '../Models/Schema.js';
import { authenticate } from '../Middleware/auth.js';

const userRouter = Router();

// Auto-generate user ID
async function generateUserId(role) {
  if (role === 'admin') return "ADMIN01";
  const count = await User.countDocuments({ role: "user" });
  const id = "USER" + String(count + 1).padStart(3, '0');
  return id;
}

// Signup
userRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const userId = await generateUserId(role);

    const user = new User({ name, email, password: hashed, role, userId });
    await user.save();

    res.status(202).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.Secretkey,
      { expiresIn: '1h' }
    );

    res.cookie('Authtoken', token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Logout
userRouter.post('/logout', (req, res) => {
  res.clearCookie('Authtoken');
  res.status(200).json({ message: "Logged out successfully" });
});

// Create Product
userRouter.post('/product', authenticate, async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const createdBy = req.userId;

    const count = await Product.countDocuments();
    const productId = "PRODUCT" + (count + 1);

    const product = new Product({
      productId,
      name,
      description,
      price,
      category,
      createdBy
    });

    await product.save();
    res.status(202).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Products by Logged-In User
userRouter.get('/products', authenticate, async (req, res) => {
  try {
    const { userId, role } = req;
    const filter = role === 'admin' ? {} : { createdBy: userId };

    const products = await Product.find(filter);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single Product
userRouter.get('/product/:productId', authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Product
userRouter.put('/product/:productId', authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category } = req.body;
    const { userId, role } = req;

    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.createdBy !== userId && role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Product
userRouter.delete('/product/:productId', authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, role } = req;

    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.createdBy !== userId && role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { userRouter };
