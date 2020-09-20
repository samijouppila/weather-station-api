const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
    User.find({}, '-__v -password', function(err, users) {
        if (err) next(); 
        res.status(200).json(users);
    });
}

const getSelectedUser = async (req, res) => {
    User.findOne({ _id: req.params.id }, '-__v -password', function(err, user) {
        if (err) res.status(404).send("Not Found");
        res.status(200).json(user);
    });
}

const createNewUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const newUser = new User(req.body);
        newUser.save( (err, user) => {
            if (err) {
                res.status(400).send(err.message)
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
        if (err) res.status(404).send("Not Found");
        for (const key in req.body) {
            user[key] = req.body[key];
        }
        user.save( function (err, user) {
            if (err) res.status(400).send("Bad Request");
            res.status(200).send("OK!")
        })
    })    
}

const deleteExistingUser = async (req, res) => {
    User.findOneAndRemove({ _id: req.params.id}, function(err, user){
        if (err) res.status(404).send("Not Found");
        res.status(200).send("OK!");
    })
}

module.exports = {
    getAllUsers,
    getSelectedUser,
    createNewUser,
    modifyExistingUser,
    deleteExistingUser
}