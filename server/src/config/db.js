var admin = require('firebase-admin');
const config = require('./config');
const dbStartup = require('debug')('app:db');
const debugError500 = require('debug')('app:error500');

try {
  dbStartup('Attempting database connection.');
  // set up database credentials and options
  let serviceAccountKey;
  // standard setup: env key
  if (config.env === 'development' || config.env === 'production') {
    serviceAccountKey = config.db.google_account_credentials;
  }
  dbStartup(serviceAccountKey);

  // options var: grant admin access to firebase and bucket services
  const firebaseAppOptions = {
    credential: admin.credential.cert(serviceAccountKey),
    storageBucket: config.db.storageBucket,
  }

  // init firebase services
  admin.initializeApp(firebaseAppOptions);
  const db = admin.firestore();
  const bucket = admin.storage().bucket();

  dbStartup('Database connection established.');

  module.exports = { db, bucket };

} catch (err) {
  debugError500(err);
}