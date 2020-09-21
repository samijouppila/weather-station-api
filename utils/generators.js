const slugify = require('slugify');
const Sensor = require('../models/Sensor');
const { v4: uuidv4 } = require('uuid');

const generateSensorSlug = async (description) => {
    let slug = slugify(description).substring(0, 40);
    const sensorWithSlug = await Sensor.findOne({ slug: slug });
    if (sensorWithSlug) {
        slug = slug + "-" + uuidv4()
    }
    return slug;
}

module.exports = {
    generateSensorSlug
};