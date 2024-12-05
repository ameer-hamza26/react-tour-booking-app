import React from 'react';
import { Box, Button, Typography, Grid,TextField } from '@mui/material';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { MdPriceChange } from "react-icons/md";
import ExploreImg from "../assets/images/ExploreImg.png"

const ExploreNow = () => {
  return (
    <>
    
    <Box
      sx={{
        position: 'relative',
        height: '60vh',
        backgroundImage: `url(${ExploreImg})`, // Your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Centered Content: Buttons for Location, Choose Data, Price Range */}
     

     
    </Box>

    
    <Box
        sx={{
          position: 'absolute',
          top: '72%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        

        <Grid container spacing={6} justifyContent="center">
          <Grid item>
            <Button variant="contained" sx={{ padding:2,backgroundColor: theme=>theme.palette.primary.light }}>
            <FaLocationDot style={{marginRight:5}}/> Location
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ padding:2,backgroundColor: theme=>theme.palette.primary.light }}>
            <MdOutlineDateRange style={{marginRight:5}}/> Choose Data
            {/* <TextField
            // style={{width:50%}}
            // label="Select Date"
            type="date"
            variant="outlined"
            // fullWidth
            // value={date}
            // onChange={handleDateChange}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          /> */}

            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ padding:2,backgroundColor: theme=>theme.palette.primary.light }}>
            <MdPriceChange style={{marginRight:5}}/>  Price Range
            {/* <TextField
            // label="Select Date"
            type="number"
            variant="outlined"
            // fullWidth
            // value={date}
            // onChange={handleDateChange}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          /> */}

            </Button>
            {/* <TextField
            label="Enter Price"
            type="number"
            variant="outlined"
            fullWidth
            value={price}
            onChange={handlePriceChange}
            InputProps={{
              startAdornment: <span>$</span>, // Optional: Add a dollar sign before the price
            }}
          /> */}
          </Grid>
        </Grid>
      </Box>

     {/* Country Buttons: 15 countries displayed as buttons */}

     <Box
     sx={{
       position: 'absolute',
       bottom: '-10%',
       left: '50%',
       transform: 'translateX(-50%)',
       textAlign: 'center',
       width: '70%',
     }}
   >
    <h1>Popular Search</h1>
     <Grid container spacing={2} justifyContent="center" sx={{ flexWrap: 'wrap' }}>
       {[
         'USA', 'Canada', 'Japan', 'Australia', 'Germany', 'France', 'Italy', 'Brazil', 'Mexico',
         'India', 'China', 'Thailand', 'Turkey', 'Egypt','Pakistan','Malaysia','Korea'
       ].map((country, index) => (
         <Grid item key={index}>
           <Button variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: '20px' }}>
             {country}
           </Button>
         </Grid>
       ))}
     </Grid>
   </Box>
   </>
  );
};

export default ExploreNow;
