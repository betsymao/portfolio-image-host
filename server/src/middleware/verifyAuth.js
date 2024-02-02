const ApiError = require('../utilities/ApiError');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const debugJwt = require('debug')('app:jwt');

const auth = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return next(ApiError.denyAccess('No token provided.'));
  } else {
    token = token.substring(7, token.length);
    debugJwt(`DEBUG - Returned token ${token}`);
  }

  try {
    const decoded = jwt.verify(token, config.authentication.jwtSecret);    
    req.user = decoded;
    debugJwt(`User credentials verified: ${req.user.username}`);
    next();
  } catch (err) {
    debugJwt(err);
    return next(ApiError.denyAccess('Invalid token.'));
  }
};

const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    debugJwt(req.user);
    return next(ApiError.forbidden('Insufficient permissions.'));
  }

  debugJwt(`Admin access granted: ${req.user.isAdmin}`);
  next();
};

const verifyAuth = {
  auth,
  admin,
};

module.exports = verifyAuth;