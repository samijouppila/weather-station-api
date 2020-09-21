const express = require('express');
const userRouter = express.Router();

const {
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
} = require('../controllers/userController');

userRouter.get('', getAllUsers);

userRouter.get('/:id', getSelectedUser);

userRouter.post('', createNewUser);

userRouter.put('/:id', modifyExistingUser);

userRouter.delete('/:id', deleteExistingUser);

userRouter.get("/:id/sensors", getUserSensors);

userRouter.post('/:id/sensors', postNewSensorForUser);

userRouter.get("/:id/sensors/:sensorId", getSelectedSensorForUser);

userRouter.put("/:id/sensors/:sensorId", updateSelectedSensorData);

userRouter.delete("/:id/sensors/:sensorId", deleteSelectedSensor);

module.exports = userRouter;