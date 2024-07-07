const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Upload a CSV file
exports.uploadCsv = (req, res) => {
  res.status(200).send('File uploaded successfully');
};

// Get list of uploaded CSV files
exports.getCsvFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../uploads/');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files');
    }
    res.status(200).json(files);
  });
};

// Get data from a specific CSV file
exports.getCsvData = (req, res) => {
  const filename = req.params.filename;
  const results = [];
  fs.createReadStream(path.join(__dirname, '../uploads/', filename))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results);
    });
};
