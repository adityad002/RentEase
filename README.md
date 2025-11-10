# 🛋️ RentEase - Furniture Rental Platform

A modern, full-stack furniture rental application built with React, Node.js, and MongoDB.

## ✨ Features

### 🏠 For Users
- **Browse Products** - Explore available furniture for rent
- **Submit Rental Requests** - Request furniture with custom rental duration
- **Track Requests** - View status of your rental requests
- **User Accounts** - Register and login securely

### 👨‍💼 For Administrators
- **Manage Products** - Add, edit, and delete furniture listings
- **Process Requests** - Approve, reject, or complete rental requests
- **Admin Dashboard** - View all requests and products

## 🛠️ Tech Stack

**Backend**
- Node.js + Express.js 4.21
- MongoDB + Mongoose 7.8
- RESTful API architecture

**Frontend**
- React 19
- Material-UI 7.3
- React Router 7
- Axios for API calls

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (configured)

### Installation & Running

**Terminal 1 - Backend:**
```bash
cd server
npm install
node server.js
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm start
```
App opens at `http://localhost:3000`

## 📁 Project Structure

```
RentEase/
├── server/                 # Node.js Express API
│   ├── controllers/        # Request handlers
│   ├── models/             # Database schemas
│   ├── routes/             # API routes
│   └── server.js
│
└── client/                 # React frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Application pages
    │   ├── services/       # API calls
    │   └── theme/          # UI styling
    └── public/
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Create user account |
| POST | `/api/users/login` | User login |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| GET | `/api/requests` | Get rental requests |
| POST | `/api/requests` | Submit rental request |
| PUT | `/api/requests/:id` | Update request status (admin) |
| DELETE | `/api/requests/:id` | Delete request |

## 🎯 Pages

- **Home** (`/`) - Landing page
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Create account
- **Products** (`/products`) - Browse and manage furniture
- **Requests** (`/requests`) - Submit and track rental requests
- **Admin** (`/admin`) - Admin dashboard

## 📝 User Roles

### Customer
- Browse available furniture
- Submit rental requests
- Track request status
- View request history

### Admin
- Manage product catalog
- Process rental requests
- View all requests
- Analytics dashboard

## ⚙️ Configuration

Both server and client use `.env` files for configuration:

**server/.env**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

**client/.env**
```
REACT_APP_API_URL=http://localhost:5000
```

## 🔧 Troubleshooting

**Server won't start?**
- Check if port 5000 is available: `lsof -i :5000`
- Verify MongoDB connection string in `.env`

**Client won't connect?**
- Ensure server is running on port 5000
- Check `REACT_APP_API_URL` in client `.env`
- Clear browser cache and restart

**MongoDB connection error?**
- Verify connection string is correct
- Check MongoDB Atlas cluster is running
- Ensure IP whitelist includes your machine

## 📦 Dependencies

See `server/package.json` and `client/package.json` for complete dependency lists.

## 🎉 Getting Started

1. Clone/download the project
2. Follow Quick Start instructions above
3. Create an account in the app
4. Browse furniture and submit rental requests
5. (Admin) Login as admin to manage requests

## 📞 Support

For issues or questions:
1. Check server console for error messages
2. Check browser console (F12) for client errors
3. Verify all `.env` files are properly configured

---

**Version:** 1.0.0  
**Last Updated:** 11 November 2025  
**Status:** ✅ Ready to Use
