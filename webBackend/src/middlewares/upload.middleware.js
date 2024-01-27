const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = 'uploads/';
const imageDirectory = path.join(uploadDirectory, 'images');

// Ensure the directories exist
fs.promises.mkdir(uploadDirectory, { recursive: true })
  .then(() => fs.promises.mkdir(imageDirectory, { recursive: true }))
  .catch(error => console.error('Error creating directories:', error));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDirectory);
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    const fileName = file.originalname.replace(`.${extension}`, '');
    const finalFileName = fileName + '.' + extension;
    cb(null, finalFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
