const winston = require("./winston");

const ErrorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    winston.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
            req.method
        } - ${req.ip}`
    );

    res.status(err.status || 500);
    res.json({ error: err.message });
};

module.exports = ErrorHandler;
