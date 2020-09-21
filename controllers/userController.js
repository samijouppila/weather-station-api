const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Sensor = require('../models/Sensor');
const {
    generateSensorSlug
} = require('../utils/generators');

const getAllUsers = async (req, res, next) => {
    User.find({}, '-__v -password', function(err, users) {
        if (err) next(); 
        res.status(200).json({users});
    });
}

const getSelectedUser = async (req, res) => {
    User.findOne({ _id: req.params.id }, '-__v -password', function(err, user) {
        if (err || !user) return res.status(404).send("Not Found");
        res.status(200).json(user);
    });
}

const createNewUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const newUser = new User(req.body);
        newUser.save( (err, user) => {
            if (err || !user) {
                return res.status(400).send(err.message);
            }
            console.log(user);
            res.status(201).send("Created")
        })
    } catch (error) {
        console.log(error)
        next();
    }
}

const modifyExistingUser = async (req, res) => {
    User.findOne({ _id: req.params.id}, '__v', function (err, user) {
        if (err || !user) res.status(404).send("Not Found");
        delete req.body._id; // Prevent changing _id
        for (const key in req.body) {
            user[key] = req.body[key];
        }
        user.save( function (err, user) {
            if (err) return res.status(400).send("Bad Request");
            res.status(200).send("OK!")
        })
    })    
}

const deleteExistingUser = async (req, res) => {
    User.findOneAndDelete({ _id: req.params.id}, function(err, user) {
        if (err || !user)  return res.status(404).send("Not Found");
        res.status(200).send("OK!");
    })
}

const getUserSensors = async (req, res) => {
    Sensor.find({ user: req.params.id }, '-__v -password -user', function (err, sensors) {
        if (err)  return res.status(404).send("User not found")
        res.status(200).json({sensors});
    })
}

const postNewSensorForUser = async (req, res) => {
    if (!(typeof req.body['description'] === 'string')) {
        return res.status(400).send("Description missing")
    }
    const slug = await generateSensorSlug(req.body.description);
    User.findOne({ _id: req.params.id}, function(err, user) {
        if (err || !user) return res.status(404).send("User not found");
        const newSensor = new Sensor({
            ...req.body,
            user: user._id,
            slug: slug,
            password: uuidv4()
        })
        newSensor.save( (err, sensor) => {
            if (err) {
                console.log(err)
                return res.status(400).send("Bad Request");
            }
            console.log(sensor);
            res.status(201).json({
                slug: sensor.slug,
                auth: {
                    _id: sensor._id,
                    password: sensor.password
                }
            });
        })
    });
}

const getSelectedSensorForUser = async (req, res) => {
    User.findOne( { _id: req.params.id }, function(err, user) {
        if (err || !user) return res.status(404).send("User not found");
        Sensor.findOne( { user: user._id, _id: req.params.sensorId }, '-__v -password -user', function(err, sensor) {
            if (err || !sensor) return res.status(404).send("Sensor not found");
            res.status(200).json(sensor);
        });
    });
}

const updateSelectedSensorData = async (req, res) => {
    User.findOne( { _id: req.params.id }, function(err, user) {
        if (err || !user) return res.status(404).send("User not found");
        Sensor.findOne( { user: user._id, _id: req.params.sensorId }, function(err, sensor) {
            if (err || !sensor) return res.status(404).send("Sensor not found");
            delete req.body.slug; // Prevent changing slug
            delete req.body._id; // Prevent changing _id
            for (const key in req.body) {
                sensor[key] = req.body[key];
            }
            sensor.save( function (err, sensor) {
                if (err) return res.status(400).send("Bad Request");
                res.status(200).send("OK!")
            })
        });
    })
}

const deleteSelectedSensor = async (req, res) => {
    User.findOne( { _id: req.params.id }, function (err, user) {
        if (err || !user) return res.status(404).send("User not found");
        Sensor.findOneAndDelete({ user: user._id, _id: req.params.sensorId}, function(err, sensor) {
            if (err || !sensor) return res.status(404).send("Sensor not Found");
            res.status(200).send("OK!");
        })
    })
}

module.exports = {
    getAllUsers,
    getSelectedUser,
    createNewUser,
    modifyExistingUser,
    deleteExistingUser,
    getUserSensors,
    postNewSensorForUser,
    getSelectedSensorForUser,
    updateSelectedSensorData,
    deleteSelectedSensor
}