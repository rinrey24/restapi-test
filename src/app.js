const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { errorResponse } = require('./utils/response');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/', routes);

app.use((req, res) => {
  return errorResponse(res, 404, 404, 'Endpoint tidak ditemukan');
});

app.use((err, req, res, next) => {

  if (err instanceof multer.MulterError) {
    return errorResponse(res, 400, 102, `Upload error: ${err.message}`);
  }


  if (err.message === 'Format file tidak didukung') {
    return errorResponse(res, 400, 102, err.message);
  }

  console.error('Unhandled error:', err);
  return errorResponse(res, 500, 500, 'Internal Server Error');
});

const multer = require('multer');



module.exports = app;