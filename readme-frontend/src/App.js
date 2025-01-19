
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReadmeGenerator from './components/ReadmeGenerator';


const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EA',
    },
    secondary: {
      main: '#00C853',
    },
    background: {
      default: '#f0f4f8',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [readmeContent, setReadmeContent] = useState('');
  const [projectName, setProjectName] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #f0f4f8 0%, #d7e3fc 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
            AI-Powered README Generator
          </Typography>
          {/* <ReadmeForm />
          <ReadmeGenerator /> */}
           {/* <ReadmeForm setReadmeContent={setReadmeContent} setProjectName={setProjectName} /> */}
           <ReadmeGenerator readmeContent={readmeContent} projectName={projectName} />
           {/* <ReadmePreview readmeContent={readmeContent} projectName={projectName} /> */}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

