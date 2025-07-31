import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF',      // Azul personalizado
    },
    secondary: {
      main: '#6c757d',      // Gris
    },
    background: {
      default: '#f5f5f5',   // Fondo general
    },
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
});
