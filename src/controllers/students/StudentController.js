const AddStudent = require("../../application/use_cases/AddStudent");
const GetAllStudents = require("../../application/use_cases/GetAllStudents");
const GetStudent = require("../../application/use_cases/GetStudent");
const AddEnrollment = require("../../application/use_cases/AddEnrollment");

module.exports = (dependecies) => {
    const { studentRepository } = dependecies.DatabaseService;
    const { CrmServices } = dependecies;

    const addNewStudent = (req, res, next) => {
        // Init use case
        const AddStudentCommand = AddStudent(studentRepository, CrmServices);
        // Extract student properties
        const { firstName, lastName, email } = req.body;
        // Call use case
        AddStudentCommand.Execute(firstName, lastName, email).then(
            (response) => {
                res.json(response);
            },
            (err) => {
                next(err);
            }
        );
    };

    const getAllStudents = (req, res, next) => {
        // Init use case
        const GetAllStudentsQuery = GetAllStudents(studentRepository);

        GetAllStudentsQuery.Execute().then(
            (students) => {
                res.json(students);
            },
            (err) => {
                next(err);
            }
        );
    };

    const getStudent = (req, res, next) => {
        const GetStudentQuery = GetStudent(studentRepository);

        GetStudentQuery.Execute(req.params.studentId).then(
            (student) => {
                res.json(student);
            },
            (err) => {
                next(err);
            }
        );
    };

    const addEnrollment = (req, res, next) => {
        const AddEnrollmentCommand = AddEnrollment(studentRepository);

        AddEnrollmentCommand.Execute(req.params.studentId, req.body).then(
            (response) => {
                res.json(response);
            },
            (err) => {
                next(err);
            }
        );
    };

    return {
        addNewStudent,
        getAllStudents,
        getStudent,
        addEnrollment,
    };
};
