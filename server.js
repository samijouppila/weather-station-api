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

let server = null;

module.exports = {
    close: function() {
        server.close();
    },
    start: function(mode) {
        let dbUri;
        if (mode === "production") {
            dbUri = process.env.MONGODB_PRODUCTION_URI;
        }
        if (mode === "test") {
            dbUri = process.env.MONGODB_TEST_URI;
        }
        (async function () {
            try {
              console.log("Connecting to database...")
              await mongoose.connect(dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                useCreateIndex: true,
              });
              console.log('Connected to database');
              server = app.listen(port, () => {
                console.log(`Weather station listening on http://localhost:${port}\n`);
              });
          
            } catch (err) {
              throw new Error(err);
            }
        })();
    }
};