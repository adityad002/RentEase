import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { requestService } from '../services/api';
import { useSearchParams } from 'react-router-dom';

const REQUEST_STATUS = {
  pending: { label: 'Pending', color: 'warning', icon: PendingActionsIcon },
  approved: { label: 'Approved', color: 'success', icon: CheckCircleIcon },
  rejected: { label: 'Rejected', color: 'error', icon: CancelIcon },
  completed: { label: 'Completed', color: 'info', icon: CheckCircleIcon },
};

const RequestsPage = ({ user }) => {
  const [searchParams] = useSearchParams();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [statusChangeDialog, setStatusChangeDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productImage: '',
    productPrice: '',
    userId: user?._id || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    rentalDuration: '1',
  });

  useEffect(() => {
    const productId = searchParams.get('productId');
    const productName = searchParams.get('productName');
    const productImage = searchParams.get('productImage');
    const productPrice = searchParams.get('productPrice');

    if (!productId) {
      fetchRequests();
    } else {
      // Update formData with product information from query params
      setFormData(prev => ({
        ...prev,
        productId: productId,
        productName: productName,
        productImage: productImage,
        productPrice: productPrice || '',
      }));
      setOpenDialog(true);
    }
  }, [searchParams]);

  // Update user info when user data changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userId: user._id || '',
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await requestService.getAllRequests();
      setRequests(response.data);
    } catch (err) {
      setError('Failed to fetch requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitRequest = async () => {
    try {
      await requestService.createRequest(formData);
      setOpenDialog(false);
      setFormData({
        productId: '',
        productName: '',
        productImage: '',
        productPrice: '',
        userId: user?._id || '',
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        rentalDuration: '1',
      });
      await fetchRequests();
      alert('Rental request submitted successfully!');
    } catch (err) {
      setError('Failed to submit request');
      console.error(err);
    }
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await requestService.deleteRequest(id);
        await fetchRequests();
      } catch (err) {
        setError('Failed to delete request');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async () => {
    try {
      await requestService.updateRequestStatus(selectedRequest._id, newStatus);
      setStatusChangeDialog(false);
      setSelectedRequest(null);
      setNewStatus('');
      await fetchRequests();
    } catch (err) {
      setError('Failed to update request status');
      console.error(err);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusBadge = (status) => {
    const statusInfo = REQUEST_STATUS[status] || REQUEST_STATUS.pending;
    return (
      <Chip
        icon={<statusInfo.icon />}
        label={statusInfo.label}
        color={statusInfo.color}
        variant="outlined"
      />
    );
  };

  if (loading && requests.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
        {searchParams.get('productId') ? 'Submit Rental Request' : 'My Rental Requests'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!searchParams.get('productId') && (
        <>
          {requests.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography color="textSecondary" sx={{ mb: 2 }}>
                You haven't submitted any rental requests yet.
              </Typography>
              <Button variant="contained" href="/products" sx={{ backgroundColor: '#4f46e5' }}>
                Browse Furniture
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {requests.map(request => (
                <Grid item xs={12} md={6} key={request._id}>
                  <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}>
                    <Box sx={{ display: 'flex' }}>
                      {request.productImage && (
                        <CardMedia
                          component="img"
                          sx={{ width: 150, height: 150, objectFit: 'cover' }}
                          image={request.productImage}
                          alt={request.productName}
                        />
                      )}
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {request.productName}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          {getStatusBadge(request.status || 'pending')}
                        </Box>
                        <Typography color="textSecondary" sx={{ mb: 1 }}>
                          <strong>Renter:</strong> {request.name}
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 1 }}>
                          <strong>Email:</strong> {request.email}
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 1 }}>
                          <strong>Phone:</strong> {request.phone}
                        </Typography>
                        <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                          <strong>Duration:</strong> {request.rentalDuration || '1'} month(s)
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardActions sx={{ gap: 1, justifyContent: 'space-between' }}>
                      <Box>
                        {user?.role === 'admin' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setSelectedRequest(request);
                              setNewStatus(request.status || 'pending');
                              setStatusChangeDialog(true);
                            }}
                          >
                            Update Status
                          </Button>
                        )}
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteRequest(request._id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Request Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Rental Request</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {formData.productImage && (
            <Box sx={{ mb: 2 }}>
              <img
                src={formData.productImage}
                alt="Furniture"
                style={{ width: '100%', borderRadius: 8, maxHeight: 200, objectFit: 'cover' }}
              />
            </Box>
          )}
          <Typography sx={{ mb: 2, fontWeight: 'bold' }}>
            Furniture: {formData.productName}
          </Typography>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Delivery Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Rental Duration (months)"
            name="rentalDuration"
            type="number"
            value={formData.rentalDuration}
            onChange={handleChange}
            margin="normal"
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitRequest} variant="contained" sx={{ backgroundColor: '#4f46e5' }}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusChangeDialog} onClose={() => setStatusChangeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Request Status</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusChangeDialog(false)}>Cancel</Button>
          <Button onClick={handleStatusChange} variant="contained" sx={{ backgroundColor: '#4f46e5' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RequestsPage;
