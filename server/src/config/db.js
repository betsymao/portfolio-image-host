var admin = require('firebase-admin');
const config = require('./config');
const dbStartup = require('debug')('app:db');
const debugError500 = require('debug')('app:error500');

try {
  dbStartup('Attempting database connection.');
  // set up database credentials and options
  let serviceAccountKey;
  // standard setup: env key; recommended setup
  if (config.env === 'development' || config.env === 'production') {
    serviceAccountKey = config.db.google_account_credentials;

  // new setup: separate envs
  } else if (config.env === 'preview') {
    serviceAccountKey = {
      type: config.db.type,
      project_id: config.db.project_id,
      private_key_id: config.db.private_key_id,
      private_key: config.db.private_key,
      client_email: config.db.client_email,
      client_id: config.db.client_id,
      auth_uri: config.db.auth_uri,
      token_uri: config.db.token_uri,
      auth_provider_x509_cert_url: config.db.client_x509_cert_url,
      client_x509_cert_url: config.db.client_x509_cert_url,
      universe_domain: config.db.universe_domain,     
    }
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