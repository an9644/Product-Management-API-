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
POSTMAN published url
```
https://documenter.getpostman.com/view/39076109/2sB2j3ArB5
```


 
