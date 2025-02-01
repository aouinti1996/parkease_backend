const express = require('express');
const sequelize = require('./config/db.connect');
const cors = require('cors');
const bodyParser = require('body-parser'); // Added this missing import
const routes = require('./routes/routes'); // Import your routes

require('./models/Reservation') ;
require('./models/User') ;
require('./models/ParkingSpot') ;
require('./models/ParkingLot') ;


const app = express();


const PORT = 3000;

app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors());


app.use('/', routes); // Set up routes

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
