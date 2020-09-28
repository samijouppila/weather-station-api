const express = require('express');
const sensorRouter = express.Router();

const {
    getAllBasicSensorInformation,
    getBasicInformationOnSelectedSensor,
    postNewRecordForSensor,
    getRecentRecordForSensor,
    getRecordHistoryForSensor
} = require('../controllers/sensorController');

sensorRouter.get("", getAllBasicSensorInformation)

sensorRouter.get("/:slug", getBasicInformationOnSelectedSensor)

sensorRouter.post('/:slug/records', postNewRecordForSensor);

sensorRouter.get('/:slug/records/recent', getRecentRecordForSensor);

sensorRouter.get('/:slug/records/history', getRecordHistoryForSensor);

module.exports = sensorRouter;