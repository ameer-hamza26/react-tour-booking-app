import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79a8',
      dark: '#c60055',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.25 },
    h3: { fontSize: '1.5rem', fontWeight: 700 },
    h4: { fontSize: '1.25rem', fontWeight: 700 },
    h5: { fontSize: '1.125rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#f5f7fb' },
        a: { color: 'inherit', textDecoration: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 600 },
        containedPrimary: { boxShadow: '0 6px 20px rgba(25,118,210,0.25)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' },
      },
    },
    MuiTextField: {
      defaultProps: { fullWidth: true },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
