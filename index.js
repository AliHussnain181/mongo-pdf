const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const app = express();

require('dotenv').config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    start();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

function start() {
  try {
    const db = mongoose.connection;

    const bucket = new GridFSBucket(db.db, {
      bucketName: 'pdf_files' // Customize the bucket name as needed
    });

    // Configure multer for file upload
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // Serve static files (e.g., HTML, CSS, JavaScript)
    app.use(express.static('public'));

    // Set the view engine to EJS
    app.set('view engine', 'ejs');

    // Handle file upload
    app.post('/upload', upload.single('file'), async (req, res) => {
      try {
        const { originalname, buffer, mimetype } = req.file;
        const uploadStream = bucket.openUploadStream(originalname, { contentType: mimetype });
        const readableStream = require('stream').Readable.from(buffer);
        readableStream.pipe(uploadStream);
        await new Promise((resolve, reject) => {
          uploadStream.on('error', reject);
          uploadStream.on('finish', resolve);
        });
        res.status(201).send('File uploaded successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Define a route to render the list of PDF files
    app.get('/pdf-list', async (req, res) => {
      try {
        const pdfFiles = await db.db.collection('pdf_files.files').find({ contentType: 'application/pdf' }).toArray();
        res.render('pdfList', { pdfFiles });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Define a route to download PDF files
    app.get('/pdf/:filename', async (req, res) => {
      try {
        const filename = req.params.filename;
        const downloadStream = bucket.openDownloadStreamByName(filename);

        // Set response headers for the file download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Pipe the file stream to the response
        downloadStream.pipe(res);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Start the server
    // const PORT = process.env.PORT || 4000;
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
}
