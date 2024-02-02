const express = require('express'); 
const router = express.Router();

const AuthPolicy = require('../policies/authPolicy');
const AuthController = require('../controllers/authController');

module.exports = () => {
// delete this?
//   router.get('/users',
//     AuthController.getUsers
//   );

  router.post('/register',
    AuthPolicy.validateAuth,
    AuthController.register,
  );

  router.post('/login',
    AuthPolicy.validateAuth,
    AuthController.login,
  );

  return router;
};