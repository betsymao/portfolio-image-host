require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const corsOptions = require('./config/corsOptions');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/routes');
const { db } = require('./config/db');
const ApiError = require('./utilities/ApiError');
const apiErrorHandler = require('./middleware/apiErrorHandler');

const debugStartup = require('debug')('app:startup');

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
debugStartup('Parsing middleware enabled on all routes.');

// file parsing middleware
app.use(fileUpload({ createParentPath: true }));

// cycle requests through morgan to track queries
app.use(morgan('dev'));

// routing middleware function
app.get('/', (req, res) => {
    res.send('Clik is an image hosting service.')
})
app.use('/api', routes());

// not found route
app.use((req, res, next) => {
    next(ApiError.notFound());
});

// error handler middleware
app.use(apiErrorHandler);

// ping database and set port
if (config.env === 'development') {
    // test database connection
    db.listCollections()
    .then(collections => {
      debugStartup('Connected to Cloud Firestore.');
      for (let collection of collections) {
        debugStartup(`Found database collection: ${collection.id}`);
      };
    })
    .then(() => {
        app.listen(
            config.port, 
            () => console.log(`Server is running on port: ${config.port}`)
        );
    });
// production
} else {
    app.listen(
        config.port, 
        () => console.log(`Server is running on port: ${config.port}`)
    );
}