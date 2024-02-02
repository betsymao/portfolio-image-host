const debugError500 = require('debug')('app:error500');

class ApiError {
  constructor(code, message, err) {
    this.code = code;
    this.message = message;
    this.err = err;
  }

  // 400 Bad Request
  static badRequest(msg) {
    return new ApiError(400, `Bad request: ${msg}`);
  }

  // 401 Unauthorised
  static denyAccess(msg) {
    return new ApiError(401, `Access denied: ${msg}`)
  }

  // 403 Forbidden
  static forbidden(msg) {
    return new ApiError(403, `Access denied: ${msg}`)
  }

  // 404 Not Found
  static notFound() {
    return new ApiError(404, 'Resource not found.');
  }

  // 413 Entity Too Large
  static tooLarge(msg){
    return new ApiError(413, `Upload failed: ${msg}`);
  }

  // 422 Unprocessable Entity
  static cannotProcess(msg){
    return new ApiError(422, `Upload failed: ${msg}`);
  }

  // 500 Internal Server Error
  static internal(msg, err) {
    debugError500(err);
    return new ApiError(500, `Internal server error: ${msg}`);
  }
}

module.exports = ApiError;