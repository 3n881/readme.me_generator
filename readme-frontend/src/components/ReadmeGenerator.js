import React, { useState } from 'react';
import { Paper, Tabs, Tab, Box } from '@mui/material';
import ReadmeForm from './ReadmeForm';
import ReadmePreview from './ReadmePreview';

function ReadmeGenerator() {
  const [readmeContent, setReadmeContent] = useState('');
  const [projectName, setProjectName] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            fontWeight: 600,
            fontSize: '1rem',
          },
        }}
      >
        <Tab label="Create README" />
        <Tab label="Preview" />
      </Tabs>
      <Box sx={{ p: 3 }}>
        {tabValue === 0 && (
          <ReadmeForm
            setReadmeContent={setReadmeContent}
            setProjectName={setProjectName}
          />
        )}
        {tabValue === 1 && (
          <ReadmePreview
            readmeContent={readmeContent}
            projectName={projectName}
          />
        )}
      </Box>
    </Paper>
  );
}

export default ReadmeGenerator;

