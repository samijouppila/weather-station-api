const express = require('express');
const userRouter = express.Router();

const {
    getAllUsers
} = require('../controllers/userController');

const users = [];

userRouter.get('', getAllUsers);

module.exports = userRouter;