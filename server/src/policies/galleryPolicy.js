const Joi = require('joi');
const ApiError = require('../utilities/ApiError');
const debugJoi = require('debug')('app:joi');

module.exports = {
  validateProduct(req, res, next) {
    debugJoi(req.body);
    const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      category: Joi.string(),
      description: Joi.string().min(3).max(2000).required(),
      image: Joi.any(),
      uploadedFile: Joi.string(),
    });
    
    const { error, value } = schema.validate(req.body);

    if (error) {
      debugJoi(error);
      switch (error.details[0].context.key) {
        case 'title':
          next(ApiError.badRequest('You must provide a valid title for the image.'));
          break;

        case 'category':
          next(ApiError.badRequest('You must provide a valid category for the image.'));
          break;

        case 'description':
          next(ApiError.badRequest('You must provide a valid description.'));
          break;

        case 'image':
        case 'uploadedFile':
          next(ApiError.badRequest('The existing image URL or path are not in a valid format. Re-upload the image.'));
          break;

        default: 
          next(ApiError.badRequest('Invalid form input. Check form input and submit again.'));
      }
    } else {
      next();
    }
  }
};