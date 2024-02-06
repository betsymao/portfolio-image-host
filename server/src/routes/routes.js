const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const uploadRoutes = require('./uploadRoutes');

module.exports = () => {
  router.use('/auth', authRoutes());

  router.use('/uploads', uploadRoutes());

  return router;
}