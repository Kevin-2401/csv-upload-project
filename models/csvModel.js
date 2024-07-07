const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const uploadDirectory = path.join(__dirname, '../uploads/');

// Function to get the list of uploaded CSV files
const getUploadedFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(uploadDirectory, (err, files) => {
      if (err) {
        return reject('Unable to scan files');
      }
      resolve(files);
    });
  });
};

// Function to read data from a specific CSV file
const readCsvFile = (filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(uploadDirectory, filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject('Error reading CSV file');
      });
  });
};

module.exports = {
  getUploadedFiles,
  readCsvFile
};
