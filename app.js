const express = require('express');
const bodyParser = require('body-parser');
const xml2json = require('xml2json');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Default XML value
const defaultXml = '<root><name>John</name><age>25</age></root>';

// Render the web form
app.get('/', (req, res) => {
  res.send(`
    <form action="/" method="POST">
      <textarea name="xmlData" rows="10" cols="50">${defaultXml}</textarea>
      <br>
      <button type="submit">Convert to JSON</button>
    </form>
  `);
});

// Handle form submission and XML to JSON conversion
app.post('/', (req, res) => {
  const { xmlData } = req.body;

  // Convert XML to JSON
  const jsonData = xml2json.toJson(xmlData);

  // Render the JSON equivalent
  res.send(`
    <pre>${jsonData}</pre>
    <br>
    <a href="/">Go Back</a>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
