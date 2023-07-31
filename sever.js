// Import Express framework
const express = require('express');

// Create an instance of Express
const app = express();
const port = 3000; // Port number, you can choose any available port

// Define your routes and middleware here
// For example:
app.get('/', (req, res) => {
  res.send('Hello Worlds!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
