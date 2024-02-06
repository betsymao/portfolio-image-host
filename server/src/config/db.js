var admin = require('firebase-admin');
const config = require('./config');
const dbStartup = require('debug')('app:db');
const debugError500 = require('debug')('app:error500');

try {
  dbStartup('Attempting database connection.');
  // let serviceAccountKey;
  // if (config.env === 'development' || config.env === 'production') {
  //   serviceAccountKey = config.db.google_account_credentials;
  // } else if (config.env === 'preview') {
  //   serviceAccountKey = {
  //     type: config.db.type,
  //     project_id: config.db.project_id,
  //     private_key_id: config.db.private_key_id,
  //     private_key: config.db.private_key,
  //     client_email: config.db.client_email,
  //     client_id: config.db.client_id,
  //     auth_uri: config.db.auth_uri,
  //     token_uri: config.db.token_uri,
  //     auth_provider_x509_cert_url: config.db.client_x509_cert_url,
  //     client_x509_cert_url: config.db.client_x509_cert_url,
  //     universe_domain: config.db.universe_domain,     
  //   }
  // }
  // debugError500(serviceAccountKey);

  // const firebaseAppOptions = {
  //   credential: admin.credential.cert(serviceAccountKey),
  //   storageBucket: config.db.storageBucket,
  // }
  
  // admin.initializeApp(firebaseAppOptions);
  // const db = admin.firestore();
  // const bucket = admin.storage().bucket();

  // Delete below later
  var serviceAccount = require(config.db.serviceAccountKey);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.db.storageBucket,
  });

  dbStartup('Database connection established.');
  const db = admin.firestore();
  const bucket = admin.storage().bucket();

  const dbPing = db.listCollections()
  .then(collections => {
    dbStartup('Connected to Cloud Firestore.');
    for (let collection of collections) {
      dbStartup(`Found database collection: ${collection.id}`);
    };
  });

  module.exports = { db, bucket, dbPing };

} catch (err) {
  debugError500(err);
}