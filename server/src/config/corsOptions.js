const config = require('./config');

const whitelist = config.corsAllowedOptions;

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  }
};

module.exports = corsOptions;