const { v4: uuidv4 } = require('uuid');
const { request } = require('express');

const users = require('../db/db').users;

const getAllUsers = (req, res) => {
    res.status(200).json(users);
}

const getSelectedUser = (req, res) => {
    const existingUser = users.find( user => user.id == req.params.id);
    if (existingUser) {
        res.status(200).json(existingUser)
    } else {
        res.status(404).send("Not Found")
    }
}

const createNewUser = (req, res) => {
    const newUser = {...req.body};
    newUser.id = uuidv4();
    users.push(newUser);
    res.status(201).json({
        id: newUser.id
    })
}

const modifyExistingUser = (req, res) => {
    const existingUser = users.find( user => user.id == req.params.id);
    if (existingUser) {
        for (const key in req.body) {
            existingUser[key] = req.body[key]
        }
        res.status(200).send("OK!")
    } else {
        res.status(404).send("Not Found")
    }
    
}

module.exports = {
    getAllUsers,
    getSelectedUser,
    createNewUser,
    modifyExistingUser
}