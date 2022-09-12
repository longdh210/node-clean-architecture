const express = require("express");
const StudentController = require("../../../controllers/students/StudentController");

// Address = api/students
// Load dependencies
const studentsRouter = (dependencies) => {
    const router = express.Router();

    // Load controller with dependencies
    const controller = StudentController(dependencies);

    router
        .route("/")
        .get(controller.getAllStudents)
        .post(controller.addNewStudent);
    router.route("/:studentId").get(controller.getStudent);
    router.route("/enrollment/:studentId").post(controller.addEnrollment);
    return router;
};

module.exports = studentsRouter;
