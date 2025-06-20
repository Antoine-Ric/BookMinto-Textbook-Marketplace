# BookMinto

BookMinto is a full-stack e-commerce web application designed for buying and selling books online. The project demonstrates modern web development best practices, scalable architecture, and a robust technology stack. This repository contains both the backend (Node.js/Express/MongoDB) and frontend (React/Redux) codebases.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

BookMinto is built to provide a seamless experience for users to browse, search, and purchase books. The backend exposes a RESTful API for product, user, and order management, while the frontend offers a responsive and interactive user interface.

---

## Tech Stack

### Frontend

- **React**: UI library for building interactive interfaces.
- **Redux Toolkit**: State management for predictable data flow.
- **React Router DOM**: Client-side routing.
- **Bootstrap & React-Bootstrap**: Responsive design and UI components.
- **Axios**: HTTP client for API requests.
- **React-Toastify**: Toast notifications for user feedback.
- **React Icons**: Icon library.
- **@paypal/react-paypal-js**: PayPal integration for payments.
- **Jest & React Testing Library**: Unit and integration testing.

### Backend

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Authentication and authorization.
- **Custom Middleware**: Error handling, authentication, async handling.

---

## Features

- User authentication and authorization (JWT-based)
- Product catalog with search and filtering
- Shopping cart and order management
- PayPal payment integration
- Admin dashboard for managing products and orders
- Responsive design for desktop and mobile
- Comprehensive error handling and notifications
- Unit and integration tests

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-org/bookMinto.git
   cd bookMinto
   ```

2. **Backend Setup**
   - Copy `example.env` to `.env` and fill in your environment variables.
   - Install dependencies:
     ```sh
     cd backend
     npm install
     ```
   - Seed the database (optional):
     ```sh
     node seeder.js
     ```
   - Start the backend server:
     ```sh
     npm start
     ```

3. **Frontend Setup**
   - Install dependencies:
     ```sh
     cd ../frontend
     npm install
     ```
   - Start the frontend development server:
     ```sh
     npm start
     ```

---

## Scripts

### Frontend

- `npm start` – Start the React development server
- `npm run build` – Build for production
- `npm test` – Run tests

### Backend

- `npm start` – Start the Express server
- `node seeder.js` – Seed the database

---

## Contributing

https://docs.google.com/document/d/1CmrlF-qqN5HVIssWoYKXthadAmJBxZdvca4_kuP-hCs/edit?tab=t.0

---

## License

This project is licensed under the MIT License.

---

