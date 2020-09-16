const validateUserCreationRequestBody = (req, res, next) => {
    // TODO Validate that request body contains correct fields and data

    next();
}

const validateUserModificationRequestBody = (req, res, next) => {
    // TODO Validate that request body contains correct fields and data

    next();
}

module.exports = {
    validateUserCreationRequestBody,
    validateUserModificationRequestBody
}