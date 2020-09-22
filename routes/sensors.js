const express = require('express');
const sensorRouter = express.Router();

const {
    getAllBasicSensorInformation,
    getBasicInformationOnSelectedSensor,
    postNewRecordForSensor,
    getRecentRecordForSensor
} = require('../controllers/sensorController');

sensorRouter.get("", getAllBasicSensorInformation)

sensorRouter.get("/:slug", getBasicInformationOnSelectedSensor)

sensorRouter.post('/:slug/records', postNewRecordForSensor);

sensorRouter.get('/:slug/records/recent', getRecentRecordForSensor);

module.exports = sensorRouter;