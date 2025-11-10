# RentEase Client

A modern, responsive React web application for the RentEase platform built with Material UI.

## Features

✨ **Modern UI** - Built with Material Design and Material UI (MUI)
📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
🔐 **Authentication** - User registration and login
📚 **Product Browsing** - Browse and manage educational products
📝 **Request Management** - Submit and manage rental requests
🎨 **Beautiful Theme** - Custom Material UI theme with smooth transitions
⚡ **Fast & Optimized** - React with optimized component rendering

## Tech Stack

- **React** - UI library
- **Material UI (MUI)** - Component library and styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Emotion** - CSS-in-JS styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Server running on http://localhost:5000

## Installation

1. Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

This creates a production-ready build in the `build/` folder.

### Run Tests
```bash
npm test
```

## Project Structure

```
client/
├── src/
│   ├── components/         # Reusable UI components
│   │   └── Navbar.js      # Navigation bar
│   ├── pages/             # Page components
│   │   ├── HomePage.js    # Home/Landing page
│   │   ├── LoginPage.js   # User login
│   │   ├── RegisterPage.js # User registration
│   │   ├── ProductsPage.js # Products listing/management
│   │   └── RequestsPage.js # Requests management
│   ├── services/          # API services
│   │   └── api.js         # Axios API client
│   ├── theme/             # MUI Theme configuration
│   │   └── theme.js       # Custom theme
│   ├── App.js             # Main App component
│   ├── index.js           # Entry point
│   └── App.css            # Global styles
├── public/                # Static files
├── .env                   # Environment variables
└── package.json           # Dependencies
```

## Key Pages

### 1. Home Page (`/`)
- Landing page with features overview
- Hero section with call-to-action
- Navigation to products and registration

### 2. Login Page (`/login`)
- User authentication
- Form validation
- Error handling
- Redirect to home on success

### 3. Register Page (`/register`)
- New user registration
- Role selection (Student/Educator)
- Form validation
- Auto-login after registration

### 4. Products Page (`/products`)
- Browse all available products
- Product cards with images and descriptions
- Admin functions (Add, Edit, Delete products)
- Request button for each product
- Real-time product updates

### 5. Requests Page (`/requests`)
- View submitted requests
- Submit new rental requests
- Pre-fill product information
- Admin request management

## Available Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Home page |
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/products` | Private | Browse and manage products |
| `/requests` | Private | Manage rental requests |

## API Integration

The client communicates with the backend API via `/src/services/api.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
