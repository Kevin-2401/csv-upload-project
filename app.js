// Import necessary modules
const express = require('express');
const cors = require('cors');
const csvRoutes = require('./routes/csvRoutes');

// Initialize the app
const app = express();

// Use CORS to allow cross-origin requests
app.use(cors());

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// Use the CSV routes
app.use('/api/csv', csvRoutes);

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
