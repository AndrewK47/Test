const express = require('express');
const cors = requre('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});