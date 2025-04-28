# Product Management API
This is a Node.js-based application providing a REST API for managing products and users. It includes features for admin and user roles, including user authentication, product creation, and management.

## Features
Admin Features:
-View all products - Admin can get a list of all products.

-View single product details - Admin can view detailed information of a specific product.

-Update a product - Admin can update details like name, description, price, and category.

-Delete a product - Admin can delete a product from the system.

## User Features:
-Sign Up - Users can create an account with an email, password, and optional role.

-Login - Users can log in and receive a token for authentication.

-Logout - Users can log out, clearing the authentication token.

-Add a product - Authenticated users can add their own products.

-View products - Authenticated users can view all products they have created.

-View single product - Users can view details of a specific product they created.

-Update product - Users can update their products (only if they created them).

-Delete product - Users can delete their own products.

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js
- MongoDB 

Setup
Clone the repository:
```
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
Admin Routes
GET /admin/products

Description: Fetch all products.

Authorization: Admin

Response:
json
Copy
Edit
{
  "products": [{...}, {...}]
}
GET /admin/product/:productId

Description: Fetch a single product by ID.

Authorization: Admin

Response:

json
Copy
Edit
{
  "product": {...}
}
PUT /admin/product/:productId

Description: Update a product by ID.

Authorization: Admin

Request Body:

json
Copy
Edit
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "category": "Category Name"
}
DELETE /admin/product/:productId

Description: Delete a product by ID.

Authorization: Admin

Response:

json
Copy
Edit
{
  "message": "Product deleted successfully"
}
User Routes
POST /signup

Description: Register a new user.

Request Body:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"  // Optional (defaults to 'user')
}
POST /login

Description: Login with email and password.

Request Body:

json
Copy
Edit
{
  "email": "john.doe@example.com",
  "password": "password123"
}
POST /logout

Description: Logout the current user.

POST /product

Description: Add a new product (authenticated users only).

Request Body:

json
Copy
Edit
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "category": "Category Name"
}
GET /products

Description: Fetch all products created by the authenticated user.

Response:

json
Copy
Edit
{
  "products": [{...}, {...}]
}
GET /product/:productId

Description: Fetch a single product by ID (created by the authenticated user).

Response:

json
Copy
Edit
{
  "product": {...}
}
PUT /product/:productId

Description: Update a product (only if created by the authenticated user).

Request Body:

json
Copy
Edit
{
  "name": "Updated Name",
  "description": "Updated Description",
  "price": 150,
  "category": "Updated Category"
}
DELETE /product/:productId

Description: Delete a product (only if created by the authenticated user).

Postman Collection
You can use the following data to test the routes in Postman:

Admin Routes:
GET /admin/products

Headers:

Authorization: Bearer <admin_token>

GET /admin/product/{productId}

Headers:

Authorization: Bearer <admin_token>

PUT /admin/product/{productId}

Headers:

Authorization: Bearer <admin_token>

Body:

json
Copy
Edit
{
  "name": "Updated Product",
  "description": "Updated Description",
  "price": 120,
  "category": "Updated Category"
}
DELETE /admin/product/{productId}

Headers:

Authorization: Bearer <admin_token>

User Routes:
POST /signup

Body:

json
Copy
Edit
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "password123"
}
POST /login

Body:

json
Copy
Edit
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
POST /product

Headers:

Authorization: Bearer <user_token>

Body:

json
Copy
Edit
{
  "name": "New Product",
  "description": "New Product Description",
  "price": 100,
  "category": "Electronics"
}
GET /products

Headers:

Authorization: Bearer <user_token>

GET /product/{productId}

Headers:

Authorization: Bearer <user_token>

PUT /product/{productId}

Headers:

Authorization: Bearer <user_token>

Body:

json
Copy
Edit
{
  "name": "Updated Product",
  "description": "Updated Product Description",
  "price": 110,
  "category": "Updated Category"
}
DELETE /product/{productId}

Headers:

Authorization: Bearer <user_token>
