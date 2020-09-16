const express = require('express');
const app = express();
const port = 3000
const apiRouter = require('./routes');

app.get('/', (req, res) => {
  res.status(200).send("Weather Station Application root. See /api");
})

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})