const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const galleryRoutes = require('./galleryRoutes');

module.exports = () => {
  router.use('/auth', authRoutes());

  router.use('/gallery', galleryRoutes());

  return router;
}