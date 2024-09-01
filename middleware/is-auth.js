const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    // decode token
    try {
        decodedToken = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}