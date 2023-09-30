import app from './api/app.js'; // Import the app

const port = process.env.PORT || 8080; // Set the port

app.listen(port, () => { // Start the server
    console.log(`Server listening on port ${port}`);
});
