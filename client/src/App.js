import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import RequestsPage from './pages/RequestsPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar user={user} onLogout={handleLogout} />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route
                path="/login"
                element={
                  user ? <Navigate to="/" /> : (
                    <LoginPage onLoginSuccess={handleLoginSuccess} />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  user ? <Navigate to="/" /> : (
                    <RegisterPage onLoginSuccess={handleLoginSuccess} />
                  )
                }
              />
              <Route
                path="/products"
                element={
                  user ? <ProductsPage user={user} /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/requests"
                element={
                  user ? <RequestsPage user={user} /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/admin"
                element={
                  user && user.role === 'admin' ? <AdminPage user={user} /> : <Navigate to="/" />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
