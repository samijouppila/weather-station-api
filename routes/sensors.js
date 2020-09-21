const express = require('express');
const sensorRouter = express.Router();

const {
    postNewRecordForSensor
} = require('../controllers/sensorController');

sensorRouter.post('/:slug/records', postNewRecordForSensor);

module.exports = sensorRouter;