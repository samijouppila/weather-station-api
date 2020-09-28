const SensorRecord = require('../models/SensorRecord');
const Sensor = require('../models/Sensor');

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

const getRecentRecordForSensor = async (req, res) => {
    Sensor.findOne( { slug: req.params.slug }, ' -__v -password' )
        .populate('user', '-username -birthDate -address -email -password -_id -__v')
        .exec( function (err, sensor) {
            if (err || !sensor) return res.status(404).send("Sensor not found");
            SensorRecord.find({ sensor: sensor._id }, '-__v -sensor')
                .sort({ timestamp: -1})
                .limit(1)
                .exec( function (err, records) {
                    if (err || records.length === 0) return res.status(404).send("No record found");
                    res.status(200).json(
                        {
                            sensor,
                            record: records[0]
                        }
                    );
                }
            );
        }
    );
}

const getRecordHistoryForSensor = async (req, res) => {
    let endDate, startDate;
    try {
        const startDateArray = req.query.startDate.split('-');
        startDate = new Date(Date.UTC(startDateArray[0], startDateArray[1] - 1, startDateArray[2]));
        const endDateArray = req.query.endDate.split('-');
        endDate = new Date(Date.UTC(endDateArray[0], endDateArray[1]- 1, endDateArray[2]));
        if ((startDate.getTime() !== startDate.getTime()) || (endDate.getTime() !== endDate.getTime())) return res.status(400).send("Invalid date query parameters");
    } catch (error) {
        return res.status(400).send("Invalid date query parameters");
    }
    Sensor.findOne( { slug: req.params.slug }, ' -__v -password' )
        .populate('user', '-username -birthDate -address -email -password -_id -__v')
        .exec( function (err, sensor) {
            if (err || !sensor) return res.status(404).send("Sensor not found");
            SensorRecord.find(
                {   
                    sensor: sensor._id,
                    timestamp:
                    {
                        "$gte": startDate,
                        "$lt": endDate,
                    }
                }
                , '-__v -sensor'
            )
                .sort({ timestamp: -1})
                .exec( function (err, records) {
                    if (err || records.length === 0) return res.status(404).send("No record found");
                    res.status(200).json(
                        {
                            sensor,
                            records: records
                        }
                    );
                }
            );
        }
    );
}

module.exports = {
    getAllBasicSensorInformation,
    getBasicInformationOnSelectedSensor,
    postNewRecordForSensor,
    getRecentRecordForSensor,
    getRecordHistoryForSensor
}