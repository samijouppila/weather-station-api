const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SensorSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    sensorDataTypes: {
        humidity: {
            type: Boolean,
            required: true
        },
        temperature: {
            type: Boolean,
            required: true
        },
        rainfall: {
            type: Boolean,
            required: true
        },
        wind: {
            type: Boolean,
            required: true
        },
        cloudCoverage: {
            type: Boolean,
            required: true
        }
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;