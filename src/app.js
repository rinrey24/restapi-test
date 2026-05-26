const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { errorResponse } = require('./utils/response');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded files (untuk foto profil)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// routes
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  return errorResponse(res, 404, 404, 'Endpoint tidak ditemukan');
});

// global error handler
app.use((err, req, res, next) => {
  // Tangkap error dari Multer
  if (err instanceof multer.MulterError) {
    return errorResponse(res, 400, 102, `Upload error: ${err.message}`);
  }

  // Tangkap error fileFilter (format tidak didukung)
  if (err.message === 'Format file tidak didukung') {
    return errorResponse(res, 400, 102, err.message);
  }

  console.error('Unhandled error:', err);
  return errorResponse(res, 500, 500, 'Internal Server Error');
});

const multer = require('multer');



module.exports = app;