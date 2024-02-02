var admin = require('firebase-admin');
const config = require('./config');
const dbStartup = require('debug')('app:db');
const debugError500 = require('debug')('app:error500');

try {
  dbStartup('Attempting database connection.');
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