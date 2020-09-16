const express = require('express');
const userRouter = express.Router();

const {
    getAllUsers,
    getSelectedUser,
    createNewUser,
    modifyExistingUser
} = require('../controllers/userController');

const {
    validateUserCreationRequestBody,
    validateUserModificationRequestBody
} = require('../validators/userValidator');

userRouter.get('', getAllUsers);

userRouter.get('/:id', getSelectedUser);

userRouter.post('', validateUserCreationRequestBody, createNewUser);

userRouter.put('/:id', validateUserModificationRequestBody, modifyExistingUser);

module.exports = userRouter;