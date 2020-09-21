const express = require('express');
const sensorRouter = express.Router();

const {
    postNewRecordForSensor
} = require('../controllers/sensorController');

sensorRouter.post('/:id/records', postNewRecordForSensor);

module.exports = sensorRouter;