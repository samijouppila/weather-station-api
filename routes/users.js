const express = require('express');
const userRouter = express.Router();

const users = [];

userRouter.get('', (req, res) => {
    res.status(200).json(users);
})

module.exports = userRouter;