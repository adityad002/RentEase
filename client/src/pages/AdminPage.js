import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
  Tabs,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { requestService, productService } from '../services/api';

const REQUEST_STATUS = {
  pending: { label: 'Pending', color: 'warning', icon: PendingActionsIcon },
  approved: { label: 'Approved', color: 'success', icon: CheckCircleIcon },
  rejected: { label: 'Rejected', color: 'error', icon: CancelIcon },
  completed: { label: 'Completed', color: 'info', icon: CheckCircleIcon },
};

const AdminPage = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    completedRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusChangeDialog, setStatusChangeDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await requestService.getAllRequests();
      setRequests(response.data);
      
      // Calculate stats
      const stats = {
        totalRequests: response.data.length,
        pendingRequests: response.data.filter(r => r.status === 'pending').length,
        approvedRequests: response.data.filter(r => r.status === 'approved').length,
        completedRequests: response.data.filter(r => r.status === 'completed').length,
      };
      setStats(stats);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      await requestService.updateRequestStatus(selectedRequest._id, newStatus);
      setStatusChangeDialog(false);
      setSelectedRequest(null);
      setNewStatus('');
      await fetchData();
    } catch (err) {
      setError('Failed to update request status');
      console.error(err);
    }
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

  const getFilteredRequests = () => {
    if (tabValue === 0) return requests;
    if (tabValue === 1) return requests.filter(r => r.status === 'pending');
    if (tabValue === 2) return requests.filter(r => r.status === 'approved');
    if (tabValue === 3) return requests.filter(r => r.status === 'completed');
    return requests;
  };

  if (!user || user.role !== 'admin') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          You do not have admin access. Only administrators can view this page.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
        🎛️ Admin Panel
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Requests
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4f46e5' }}>
                {stats.totalRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f59e0b' }}>
                {stats.pendingRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Approved
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                {stats.approvedRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3b82f6' }}>
                {stats.completedRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Requests Section */}
      <Card>
        <CardHeader
          title="Rental Requests"
          subheader="Manage and approve rental requests from customers"
        />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label={`All (${stats.totalRequests})`} />
            <Tab label={`Pending (${stats.pendingRequests})`} />
            <Tab label={`Approved (${stats.approvedRequests})`} />
            <Tab label={`Completed (${stats.completedRequests})`} />
          </Tabs>
        </Box>
        <CardContent>
          {getFilteredRequests().length === 0 ? (
            <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
              No requests found
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {getFilteredRequests().map(request => (
                <Grid item xs={12} md={6} key={request._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {request.productName}
                          </Typography>
                          <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                            {new Date(request.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        {getStatusBadge(request.status || 'pending')}
                      </Box>

                      <Box sx={{ mb: 2, backgroundColor: '#f3f4f6', p: 2, borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Customer Details:</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Name: {request.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Email: {request.email}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Phone: {request.phone}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Duration: {request.rentalDuration || '1'} month(s)
                        </Typography>
                        {request.productPrice && (
                          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: '#ec4899' }}>
                            Monthly Rental: ₹{request.productPrice}
                          </Typography>
                        )}
                      </Box>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Delivery Address:</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3, color: 'textSecondary' }}>
                        {request.address}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setSelectedRequest(request);
                            setNewStatus(request.status || 'pending');
                            setStatusChangeDialog(true);
                          }}
                          sx={{ color: '#4f46e5', borderColor: '#4f46e5' }}
                        >
                          Change Status
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          href={`mailto:${request.email}`}
                        >
                          Email Customer
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Status Change Dialog */}
      <Dialog open={statusChangeDialog} onClose={() => setStatusChangeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Request Status</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedRequest && (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Product:</strong> {selectedRequest.productName}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                <strong>Customer:</strong> {selectedRequest.name}
              </Typography>
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusChangeDialog(false)}>Cancel</Button>
          <Button onClick={handleStatusChange} variant="contained" sx={{ backgroundColor: '#4f46e5' }}>
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPage;
