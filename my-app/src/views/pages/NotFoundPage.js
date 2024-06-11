import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">The page does not exist.</Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
