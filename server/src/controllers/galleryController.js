const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { 
    storageBucketUpload, 
    getFileFromUrl, 
    deleteFileFromBucket 
} = require('../utilities/bucketServices');
const debugWRITE = require('debug')('app:write');
const debugREAD = require('debug')('app:read');

module.exports = {
  async getAllImages(req, res, next) {
    try {
      const imageRef = db.collection('images');
      const snapshot = await imageRef.get();

      let docs = [];
      snapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          title: doc.data().title,
          category: doc.data().category,
          description: doc.data().description,
          image: doc.data().image,
        })
      });
      res.send(docs);

    } catch (err) {
      return next(ApiError.internal('The image could not be found.', err));
    }
  }, 

  async uploadImage(req, res, next) {
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    let downloadURL = null;
    try {      
      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);

    } catch(err) {
      return next(ApiError.internal('An error occurred uploading the image to storage.', err));
    }

    try {
      const imageRef = db.collection('images');
      const response = await imageRef.add({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        image: downloadURL
      });
      console.log(`Added image ID: ${response.id}`);
      res.send(response.id);

    } catch(err) {
      return next(ApiError.internal('Your request could not be saved at this time.', err));
    }
  },

  async getImage(req, res, next) {
    debugREAD(req.params);

    try {
      const imageRef = db.collection('images').doc(req.params.id);
      const doc = await imageRef.get();

      if (!doc.exists) {
        return next(ApiError.badRequest('The image you were looking for does not exist.'));
      } else {
        res.send(doc.data());
      }

    } catch(err) {
      return next(ApiError.internal('Your request could not be processed at this time.', err));
    }
  },

  async updateImage(req, res, next){
    debugWRITE(req.params);
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    let downloadURL = null;
    try {      
      if (req.files) {
        const filename = res.locals.filename;
        downloadURL = await storageBucketUpload(filename);

        if (req.body.uploadedFile) {
          debugWRITE(`Deleting old image in storage: ${req.body.uploadedFile}`);
          const bucketResponse = await deleteFileFromBucket(req.body.uploadedFile);
        }
        
      } else {
        console.log(`No change to image in database.`);
        downloadURL = req.body.image;
      }

    } catch(err) {
      return next(ApiError.internal('An error occurred saving the image to storage.', err));
    }

    try {
      const imageRef = db.collection('images').doc(req.params.id);
      const response = await imageRef.update({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        image: downloadURL,
      });
      res.send(response);

    } catch(err) {
      return next(ApiError.internal('Your request could not be processed at this time.', err));
    }
  },

  async deleteImage(req, res, next) {
    try {
      const imageRef = db.collection('images').doc(req.params.id);
      const doc = await imageRef.get();

      if (!doc.exists) {
        return next(ApiError.badRequest('The image you were looking for does not exist.'));
      } 
      
      const downloadURL = doc.data().image;
      const uploadedFile = getFileFromUrl(downloadURL);

      const bucketResponse = await deleteFileFromBucket(uploadedFile);

      if (bucketResponse) {
        const response = await imageRef.delete({ exists:true });

        res.send(response);
      }

    } catch(err) {
      return next(ApiError.internal('Your request could not be saved at this time.', err));
    }
  }
};