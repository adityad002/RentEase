import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
    handleMenuClose();
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Furniture', path: '/products' },
    { label: 'My Rentals', path: '/requests' },
  ];

  return (
    <AppBar position="sticky" sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              flexGrow: 1,
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            � RentEase
          </Typography>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            onClick={handleMobileMenuOpen}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, color: '#1f2937' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
                sx={{
                  color: '#4f46e5',
                  fontWeight: '600',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {user ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen} sx={{ color: '#4f46e5' }}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>
                    {user.name || user.email}
                  </MenuItem>
                  {user.role === 'admin' && (
                    <MenuItem onClick={() => {
                      navigate('/admin');
                      handleMenuClose();
                    }}>
                      Admin Panel
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ mr: 1, color: '#4f46e5', fontWeight: '600' }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                  sx={{ backgroundColor: '#4f46e5', color: '#fff', fontWeight: '600' }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={handleMobileMenuClose}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
};

export default Navbar;
