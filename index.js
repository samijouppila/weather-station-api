const env = require('dotenv').config();
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

const mongoose = require('mongoose');

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to database');

  } catch (err) {
    throw new Error(err);
  }
})();

app.use((err, req, res, next) => {
  console.log(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send({
    error:
      err.statusCode >= 500
        ? 'An unexpected error ocurred, please try again later.'
        : err.message,
  });
});

app.listen(port, () => {
  console.log(`Weather station listening at http://localhost:${port}`)
})