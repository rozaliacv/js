const db = require('../db');

const middleware = (req, res, next) => {
     req.db = db;
    next();
}

module.exports = middleware;