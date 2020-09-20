const express = require('express');
const userRouter = express.Router();

const {
    getAllUsers,
    getSelectedUser,
    createNewUser,
    modifyExistingUser,
    deleteExistingUser
} = require('../controllers/userController');

userRouter.get('', getAllUsers);

userRouter.get('/:id', getSelectedUser);

userRouter.post('', createNewUser);

userRouter.put('/:id', modifyExistingUser);

userRouter.delete('/:id', deleteExistingUser);

module.exports = userRouter;