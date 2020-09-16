const express = require('express');
const app = express();
const port = 3000

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send("Weather Station application root. See /api");
})

const apiRouter = require('./routes');

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Weather station listening at http://localhost:${port}`)
})