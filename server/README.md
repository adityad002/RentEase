# RentEase Server

A Node.js/Express REST API server for the RentEase furniture rental platform with MongoDB integration.

## Features

- User authentication (register/login)
- Furniture product management (CRUD operations)
- Rental request handling
- Category-based product filtering
- RESTful API endpoints
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory with your configuration:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB URI and other settings:
```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?appName=YourAppName
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Requests
- `GET /api/requests` - Get all rental requests
- `POST /api/requests` - Create a new rental request
- `DELETE /api/requests/:id` - Delete a rental request

### Health Check
- `GET /api/health` - Check server health status

## Project Structure

```
server/
├── controllers/       # Request handlers
├── models/           # MongoDB schemas
├── routes/           # API route definitions
├── server.js         # Main server file
├── package.json      # Dependencies
└── .env              # Environment variables
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Notes

- Passwords are currently stored in plain text. In production, implement bcrypt or similar hashing.
- JWT token generation for authentication should be implemented for production use.
- Add input validation and error handling middleware as needed.

## License

ISC
