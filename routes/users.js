const express = require('express');
const userRouter = express.Router();

const {
    getAllUsers,
    createNewUser
} = require('../controllers/userController');

userRouter.get('', getAllUsers);

userRouter.post('', createNewUser);

module.exports = userRouter;