const express = require('express');
const sensorRouter = express.Router();

const {
    getAllBasicSensorInformation,
    getBasicInformationOnSelectedSensor,
    postNewRecordForSensor
} = require('../controllers/sensorController');

sensorRouter.get("", getAllBasicSensorInformation)

sensorRouter.get("/:slug", getBasicInformationOnSelectedSensor)

sensorRouter.post('/:slug/records', postNewRecordForSensor);

module.exports = sensorRouter;