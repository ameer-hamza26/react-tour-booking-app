import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom";
import { Typography } from '@mui/material';




const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff',color:"black",mt:1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo on the left */}
        <RouterLink to="/" underline="none" style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
        fontSize:25,
        fontWeight:"bold",
      }} >
      <Typography component="span" sx={{ color:theme => theme.palette.primary.light,fontSize:25,fontWeight:"bold",fontFamily:"-moz-initial", }}> Tour</Typography><Typography component="span" style={{ color: theme=> theme.palette.secondary.main,fontSize:25,fontWeight:"bold", }}>Bay </Typography>
    </RouterLink>

        {/* Links in the middle for larger screens */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' }, // Hidden on small screens
            gap: 3,
            
          }}
        >
          <RouterLink to="/tour" color="inherit" underline="none"  style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
        
      }}>
            Tour
          </RouterLink>
          <RouterLink to="/addTour" color="inherit" underline="none"  style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
      }}>
            Add Tour
          </RouterLink>
          <RouterLink to="/myTour" color="inherit" underline="none"  style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
      }}>
            My Tour
          </RouterLink>
        </Box>

        {/* Explore Now button for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button variant="contained"  sx={{zIndex:"2", textTransform: 'none',backgroundColor:theme => theme.palette.primary.light, ":hover": {
        backgroundColor:theme => theme.palette.primary.dark ,
      }, }}>
            <RouterLink  to="/exploreNow"   style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
      }}>Explore Now</RouterLink>
          </Button>
        </Box>

        {/* Hamburger menu for small screens */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuItem onClick={handleMenuClose}>
            <RouterLink to="/tour" color="inherit" underline="none"  style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
        
      }}>
             Tour
          </RouterLink>
         
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <RouterLink to="/addTour" color="inherit" underline="none"  style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
      }}>
            add Tour
          </RouterLink>
         
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <RouterLink to="/myTour" color="inherit" underline="none"  style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
      }}>
            My Tour
          </RouterLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <Button variant="contained"  sx={{zIndex:"2", textTransform: 'none',backgroundColor:theme => theme.palette.primary.light, ":hover": {
        backgroundColor:theme => theme.palette.primary.dark ,
      }, }}>
            <RouterLink  to="/exploreNow"   style={{
        textDecoration: 'none', // Remove underline
        color: 'inherit',       // Inherit color from Button
      }}>Explore Now</RouterLink>
          </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
