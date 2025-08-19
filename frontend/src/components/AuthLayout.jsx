import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: (theme) => theme.palette.background.default,
        backgroundImage: (theme) =>
          `radial-gradient(40rem 20rem at -10% -10%, ${theme.palette.primary.light}22, transparent),
           radial-gradient(40rem 20rem at 110% 110%, ${theme.palette.secondary.light}22, transparent)`,
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
            backdropFilter: 'saturate(120%) blur(2px)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
