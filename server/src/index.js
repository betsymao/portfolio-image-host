require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const corsOptions = require('./config/corsOptions');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/routes');
const { dbPing } = require('./config/db');
const ApiError = require('./utilities/ApiError');
const apiErrorHandler = require('./middleware/apiErrorHandler');

const debugStartup = require('debug')('app:startup');

const app = express();

app.use(helmet());
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ createParentPath: true }));
app.use(morgan('dev'));
debugStartup('Parsing middleware enabled on all routes.');

app.use('/api', routes());

app.use((req, res, next) => {
    next(ApiError.notFound());
});

app.use(apiErrorHandler);

dbPing.then(() => {
    app.listen(
        config.port, 
        () => console.log(`Server is running on port: ${config.port}`)
    );
})