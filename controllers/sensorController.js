const SensorRecord = require('../models/SensorRecord');
const Sensor = require('../models/Sensor');

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
    postNewRecordForSensor
}