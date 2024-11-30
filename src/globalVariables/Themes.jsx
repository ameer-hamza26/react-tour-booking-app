import { createTheme, ThemeProvider } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
      light: '#F16B51', // Light shade of primary color
      dark: '#cb2f10',  // Dark shade of primary color
    },
    secondary: {
      main: '#ff4081', // Secondary color
    },
    custom: {
      main: '#ff9800', // Custom color (you can define your own palettes)
    },
  },
  spacing: 8, // Default spacing unit (8px)
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Global font
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Disable capitalization for buttons
      backgroundColor:"#cb2f10"
    },
  },
});

export default Theme;
