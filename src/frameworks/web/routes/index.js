const express = require("express");
const students = require("./students");

const apiRouter = (dependencies) => {
    const routers = express.Router();

    const studentsRouter = students(dependencies);

    routers.use("/students", studentsRouter);
    return routers;
};

module.exports = apiRouter;
