const SensorRecord = require('../models/SensorRecord');
const Sensor = require('../models/Sensor');
const User = require('../models/User');

const getAllBasicSensorInformation = async (req, res, next) => {
    Sensor.find( {}, '-__v -password')
        .populate('user', '-username -birthDate -address -email -password -_id -__v')
        .exec( function (err, sensors) {
            if (err) next();
            const sensorInformation = { sensors };
            res.status(200).json(sensorInformation);
        }
    );
}

const getBasicInformationOnSelectedSensor = async (req, res, next) => {
    Sensor.findOne( { slug: req.params.slug }, '-__v -password')
        .populate('user', '-username -birthDate -address -email -password -_id -__v')
        .exec( function (err, sensor) {
            if (err || !sensor) return res.status(404).send("Sensor not found");
            res.status(200).json(sensor);
        }
    );
}

const postNewRecordForSensor = async (req, res) => {
    console.log(req.body);
    Sensor.findOne({ slug: req.params.slug }, function(err, sensor) {
        if (err || !sensor) return res.status(404).send("Sensor not found");
        const newRecord = new SensorRecord({
            ...req.body,
            sensor: sensor._id
        });
        newRecord.save( (err, sensorRecord) => {
            if (err) return res.status(400).send("Bad Request");
            res.status(201).send("Created");
        });
    });
}

module.exports = {
    getAllBasicSensorInformation,
    getBasicInformationOnSelectedSensor,
    postNewRecordForSensor
}