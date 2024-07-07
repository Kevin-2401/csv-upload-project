const express = require('express');
const multer = require('multer');
const csvController = require('../controllers/csvController');

// Initialize the router
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  }
});

// Define routes
router.post('/upload', upload.single('csvFile'), csvController.uploadCsv);
router.get('/files', csvController.getCsvFiles);
router.get('/file/:filename', csvController.getCsvData);

module.exports = router;
