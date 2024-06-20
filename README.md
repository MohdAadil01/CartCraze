# CartCraze - E-commerce Backend

CartCraze is a comprehensive e-commerce backend built with Node.js, Express, and MongoDB. The application provides all necessary backend functionality for managing products, users, orders, and authentication.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- User Roles (Admin, Customer)
- Product Management (CRUD operations for products)
- Order Management (Place orders, view order history)
- Cart Management (Add to cart, remove from cart)
- JWT Authentication

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MohdAadil01/CartCraze.git
    ```

2. Navigate to the project directory:
    ```bash
    cd CartCraze
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up your MongoDB database and update the `.env` file with your MongoDB URI and other necessary environment variables:
    ```
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```

2. The server will run on `http://localhost:5000`.

## API Documentation

### Endpoints

- **Auth**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in a user

- **Users**
  - `GET /api/users` - Get all users (Admin only)
  - `GET /api/users/:id` - Get user by ID
  - `PUT /api/users/:id` - Update user (Admin and user only)
  - `DELETE /api/users/:id` - Delete user (Admin only)

- **Products**
  - `POST /api/products` - Create a new product (Admin only)
  - `GET /api/products` - Get all products
  - `GET /api/products/:id` - Get a product by ID
  - `PUT /api/products/:id` - Update a product (Admin only)
  - `DELETE /api/products/:id` - Delete a product (Admin only)

- **Orders**
  - `POST /api/orders` - Place a new order
  - `GET /api/orders` - Get all orders (Admin only)
  - `GET /api/orders/:id` - Get an order by ID (Admin and user only)
  - `PUT /api/orders/:id` - Update an order status (Admin only)
  - `DELETE /api/orders/:id` - Cancel an order (Admin and user only)

- **Cart**
  - `POST /api/cart` - Add to cart
  - `GET /api/cart` - Get cart items
  - `DELETE /api/cart/:id` - Remove item from cart


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

