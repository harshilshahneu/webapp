import app from './api/app.js'; // Import the app
import { syncDB } from './api/sequelize.js';

const port = process.env.PORT || 8080; // Set the port

app.listen(port, async () => { // Start the server
    //sync the database
    await syncDB();
    
    console.log(`Server listening on port ${port}`);
});
