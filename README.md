# Product Management API

This is a Node.js-based application providing a REST API for managing products and users. It includes features for admin and user roles, including user authentication, product creation, and management.

## Features
## Admin Features:
- View all products - Admin can get a list of all products.

- View single product details - Admin can view detailed information of a specific product.

- Update a product - Admin can update details like name, description, price, and category.

- Delete a product - Admin can delete a product from the system.

## User Features:
- Sign Up - Users can create an account with an email, password, and optional role.

- Login - Users can log in and receive a token for authentication.

- Logout - Users can log out, clearing the authentication token.

- Add a product - Authenticated users can add their own products.

- View products - Authenticated users can view all products they have created.

- View single product - Users can view details of a specific product they created.

- Update product - Users can update their products (only if they created them).

- Delete product - Users can delete their own products.

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js
- MongoDB 

Setup
Clone the repository:
```
git clone git@github.com:an9644/Product-Management-API-.git
```
Install dependencies:
```
cd Backend
npm install
```
Run the server:
```
npm start
```

API Documentation


### Admin Routes
- GET /admin/products
Description: Fetch all products.

- GET /admin
   Description:Fetching Product by Product Is

- PUT /admin/product/:productId

Description: Update a product by ID.
```
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "category": "Category Name"
}

```
- DELETE /admin/product/:productId

Description: Delete a product by ID.

## User Routes

- POST /signup

Description: Register a new user.
```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user" 
}
```
- POST /login

Description: Login with email and password.
```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- POST /logout

Description: Logout the current user.

- POST /product

Description: Add a new product (authenticated users only).
```
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "category": "Category Name"
}
```
- GET /products

Description: Fetch all products created by the authenticated user.

- GET /product/:productId

Description: Fetch a single product by ID (created by the authenticated user).

- PUT /product/:productId

Description: Update a product (only if created by the authenticated user).
```
{
  "name": "Updated Name",
  "description": "Updated Description",
  "price": 150,
  "category": "Updated Category"
}
```
- DELETE /product/:productId

Description: Delete a product (only if created by the authenticated user).

