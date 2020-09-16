const users = require('../db/db').users;

const getAllUsers = (req, res) => {
    res.status(200).json(users);
}

const createNewUser = (req, res) => {
    res.status(200).send("OK!")
}

module.exports = {
    getAllUsers,
    createNewUser
}