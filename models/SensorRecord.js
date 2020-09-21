const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SensorRecordSchema = new Schema({
    timestamp: {
        type: Date,
        required: true
    },
    values: {
        humidity: Number,
        temperature: Number,
        rainfall: Number,
        wind: Number,
        cloudCoverage: Number
    },
    sensor: {
        type: Schema.ObjectId,
        ref: 'Sensor'
    }
});

const SensorRecord = mongoose.model('SensorRecord', SensorRecordSchema);

module.exports = SensorRecord;