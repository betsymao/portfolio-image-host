const express = require('express'); 
const router = express.Router();

const GalleryPolicy = require('../policies/galleryPolicy');
const FilePolicy = require('../policies/filePolicy');
const VerifyAuth = require('../middleware/verifyAuth');
const fileServerUpload = require('../middleware/fileServerUpload');
const GalleryController = require('../controllers/galleryController');

module.exports = () => {
  // get all images
  router.get('/', 
    GalleryController.getAllImages
  );

  // upload image
  router.post('/', [
    VerifyAuth.auth,
    GalleryPolicy.validateImage,
    FilePolicy.filePayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileServerUpload,
  ],
    GalleryController.uploadImage,
  );

  // get image by id
  router.get('/:id',
    GalleryController.getImage,
  );

  // update image by id
  router.put('/:id', [
    VerifyAuth.auth,
    GalleryPolicy.validateImage,
    FilePolicy.filePayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileServerUpload,
  ],
    GalleryController.updateImage,
  );

  // delete image by id
  router.delete('/:id', [
    VerifyAuth.auth,
    VerifyAuth.admin,
  ],
    GalleryController.deleteImage,
  );

  return router;
};