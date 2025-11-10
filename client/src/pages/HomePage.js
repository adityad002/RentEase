import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SavingsIcon from '@mui/icons-material/Savings';

const HomePage = ({ user }) => {
  const features = [
    {
      icon: LocalShippingIcon,
      title: 'Fast Delivery',
      description: 'Quick and hassle-free delivery of quality furniture to your doorstep.',
    },
    {
      icon: VerifiedUserIcon,
      title: 'Trusted Quality',
      description: 'All our furniture is carefully selected and regularly maintained.',
    },
    {
      icon: SavingsIcon,
      title: 'Affordable Rentals',
      description: 'Rent premium furniture at a fraction of the purchase price.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
          color: '#fff',
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Furnish Your Dream Home, On Rent
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            Premium furniture rental for every occasion. Affordable, flexible, and hassle-free.
          </Typography>
          {!user && (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/register"
                sx={{
                  backgroundColor: '#fff',
                  color: '#4f46e5',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{ borderColor: '#fff', color: '#fff' }}
              >
                Login
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}
        >
          Why Choose RentEase?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 60,
                          color: '#4f46e5',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: '#f9fafb', py: 6, mb: 6 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            Ready to Furnish Your Space?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'textSecondary' }}>
            Explore our wide collection of affordable furniture rentals today.
          </Typography>
          {user ? (
            <Button
              variant="contained"
              component={RouterLink}
              to="/products"
              size="large"
              sx={{ backgroundColor: '#4f46e5' }}
            >
              Browse Furniture
            </Button>
          ) : (
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
              size="large"
              sx={{ backgroundColor: '#4f46e5' }}
            >
              Sign Up Now
            </Button>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
