const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();
const cors = require('cors'); // Import cors


const app = express();
const port = 3000;

// Use body-parser to handle JSON requests
app.use(bodyParser.json());

app.use(cors());


// Initialize OpenAI client
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Fetch API key from environment variables
});

/**
 * @route POST /api/generate-readme
 * @desc Generate a structured README file for a project
 * @param {string} projectName - The name of the project
 * @param {string} description - A brief description of the project
 * @param {string} technologies - Technologies used in the project
 * @param {string} liveDemoLink - Optional live demo link
 * @param {string} youtubeLink - Optional YouTube link
 * @param {string} icons - Optional icons for the README sections
 * @returns {string} A formatted README file
 */
app.post('/api/generate-readme', async (req, res) => {
  const { projectName, description, technologies,liveDemoLink,
    youtubeLink,
    icons, } = req.body;

  // Validate input
  if (!projectName || !description || !technologies) {
    return res.status(400).json({ error: 'Required fields: projectName, description, and technologies are missing' });
  }

  // Prepare the prompt for OpenAI
  const prompt = `
    Create a well-structured README.md file for the project '${projectName}' using the following details:

    **Rules:**
    - Always start with '# Project Title' and include the project name.
    - Dont start it with \`\`\`markdown for the starting point.Always start with '# Project Title' and include the project name
    - Include a '## Project Description' section with the provided description.
    - Add a '## Table of Contents' section with links to other sections.
    - Use \`\`\`bash blocks for any command line instructions (e.g., \`\`\`bash\\n$ npm start\\n\`\`\`).
    - Include sections for Installation, Usage, Features, Contributing Guidelines, License, Badges, Screenshots, and FAQs.
    - Ensure proper Markdown formatting and consistent spacing between sections.
    - Provide placeholders for screenshots, badges, and FAQs if content is not provided.


    **Project Description:** ${description}
    **Technologies Used:** ${technologies}
    **Live Demo Link:** ${liveDemoLink || 'None provided'}
    **YouTube Demo Link:** ${youtubeLink || 'None provided'}
    **Icons for Sections:** ${icons || 'None provided'}


    The README should include:
    - **# Project Title**: '${projectName}'
    - **## Project Description**: Provide a brief description of the project.
    - **## Table of Contents**: A list of sections in the README.
    - **## Installation Instructions**: Provide detailed steps to install the project. Example: \`\`\`bash\n npm install \`\`\`
    - **## Usage Instructions**: How to use the project once set up. Example: \`\`\`bash\n npm start \`\`\`
    - **## Features**: Key features of the project.
    - **## Contributing Guidelines**: Instructions on how others can contribute to the project.
    - **## License**: License information (e.g., MIT, GPL).
    - **## Badges**: Add badges if available (e.g., build status, version).
    - **## Screenshots**: Optional screenshots or images for the project.
    - **## FAQs**: Frequently asked questions and their answers.
    - **## Roadmap**: If applicable, include the project roadmap for future development.
    - **## Contact Information**: Information on how to contact the project owner.
    - **## Test Instructions**: How to run tests for the project.
    - **## Deployment Instructions**: How to deploy the project.
    - **## Acknowledgments**: Credits or thanks to contributors or inspirations.

    Use proper Markdown formatting, and leave placeholders for images, badges, and links where necessary. Provide content for each section if possible, otherwise include placeholder text like "Coming soon".
    Ensure proper Markdown formatting and provide placeholders for images or links where necessary.
  `;

  try {
    // Call OpenAI API to generate README content
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4', // Updated model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000, // Adjust token limit as needed
    });

    // Send the generated README content as the response
    res.json({
      readme: response.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error('Error generating README:', error);
    res.status(500).json({ error: 'Failed to generate README' });
  }
});

/**
 * @route GET /api/health
 * @desc Health check endpoint to verify server status
 * @returns {string} Server status message
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running and healthy' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
