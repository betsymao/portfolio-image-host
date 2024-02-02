const { bucket } = require('../config/db');
const debugBucket = require('debug')('app:bucket');
const config = require('../../src/config/config');
const uuid = require('uuid');
const fs = require('fs');

module.exports = {
  async storageBucketUpload(filename) {
    debugBucket(`Firestore File Name: ${filename}`);
    const storageToken = uuid.v4();

    const serverFilePath = `./public/uploads/${filename}`;
    const options = {
      destination: filename,
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken,
        },
      }
    };

    fs.access(serverFilePath, fs.F_OK, (err) => {
      if (err) {
        debugBucket(err);
        return({
          message: 'Error occurred storing file to server.'
        });
      } else {
        debugBucket("File successfully stored in server.");
      }
    });

    const result = await bucket.upload(serverFilePath, options);
    const bucketName = result[0].metadata.bucket;
    debugBucket(`Bucket Name: ${bucketName}`);

    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;
    console.log(`File successfully uploaded to Storage Bucket: ${downloadURL}`);

    fs.unlink(serverFilePath, err => {
      if (err) {
        debugBucket(err);
        return({
          message: 'Error occurred removing file from temporary local storage.'
        });
      } else {
        debugBucket('File in temporary local storage deleted.');
      }
    });

    return downloadURL;
  },

  getFileFromUrl(downloadURL) {
    debugBucket(`DownloadURL from DB: ${downloadURL}`);

    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucket}/o/`;
    let fileGlob = downloadURL.replace(baseURL, '');
    
    const indexOfEndPath = fileGlob.indexOf('?');
    fileGlob = fileGlob.substring(0, indexOfEndPath);
    
    debugBucket(`File in bucket for deletion: ${fileGlob}`);
    return fileGlob;
  },

  async deleteFileFromBucket(uploadedFile) {
    const file = bucket.file(uploadedFile);
    const fileChecker = await file.exists();

    if (fileChecker[0] === false) {
      const options = {
        ignoreNotFound: true,
      };

      const data = await file.delete(options);
      debugBucket(`The file: ${uploadedFile}, does not exist in Storage. Check server for inconsistent data handling and database queries.`);

      return data[0];

    } else {
      const data = await file.delete();
      console.log(`File deleted from Storage Bucket: ${uploadedFile}`);

      return data[0];
    }
  }
};