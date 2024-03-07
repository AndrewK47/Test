const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const { DOMParser } = require('xmldom');
const { getInvoiceInformation } = require('../Test/utils/function');
const port = process.env.PORT || 3000;

// app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


const upload = multer({ dest: 'uploads/' });

app.post('/extract', upload.single('invoice'), (req, res) => {
    // Access the uploaded file
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Read the XML content from the file
    const xmlString = require('fs').readFileSync(file.path, 'utf-8');
    const xmlDocument = new DOMParser().parseFromString(xmlString, 'text/xml');

    // Call your function with the XML document
    const result = getInvoiceInformation(xmlDocument);

    // Send the result back to the client
    res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});