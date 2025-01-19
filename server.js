const express = require('express');
const sequelize = require('./config/db.connect');
const cors = require('cors');
const bodyParser = require('body-parser'); // Added this missing import
const routes = require('./routes/routes'); // Import your routes

const app = express();
const PORT = 5000;

require('./models/Reservation') ;
require('./models/User') ;
require('./models/ParkingSpot') ;
require('./models/ParkingLot') ;
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes); // Set up routes

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');

        // Sync models with the database
        sequelize.sync()
            .then(() => {
                console.log('Models are synced with the database');

                // Start the server after models are synced
                app.listen(PORT, () => {
                    console.log(`Server listening on port ${PORT}`);
                });
            })
            .catch((err) => {
                console.error('Error syncing models:', err);
            });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
