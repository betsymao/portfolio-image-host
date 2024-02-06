const express = require('express'); 
const router = express.Router();

const UploadPolicy = require('../policies/uploadPolicy');
const FilePolicy = require('../policies/filePolicy');
const VerifyAuth = require('../middleware/verifyAuth');
const fileServerUpload = require('../middleware/fileServerUpload');
const UploadController = require('../controllers/uploadController');

module.exports = () => {
  // get all images
  router.get('/', 
    UploadController.getAllImages
  );

  // upload image
  router.post('/', [
    VerifyAuth.auth,
    UploadPolicy.validateImage,
    FilePolicy.filePayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileServerUpload,
  ],
    UploadController.uploadImage,
  );

  // get image by id
  router.get('/:id',
    UploadController.getImage,
  );

  // update image by id
  router.put('/:id', [
    VerifyAuth.auth,
    VerifyAuth.admin,
    UploadPolicy.validateImage,
    FilePolicy.filePayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileServerUpload,
  ],
    UploadController.updateImage,
  );

  // delete image by id
  router.delete('/:id', [
    VerifyAuth.auth,
    VerifyAuth.admin,
  ],
    UploadController.deleteImage,
  );

  return router;
};