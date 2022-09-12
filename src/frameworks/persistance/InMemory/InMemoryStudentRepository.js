const StudentRepository = require("../../../application/contracts/StudentRepository");

module.exports = class InMemoryStudentRepository extends StudentRepository {
    constructor() {
        super();
        this.students = [];
        this.currentId = 1;
    }

    add(studentInstance) {
        try {
            this.currentId = this.currentId + 1;
            studentInstance.id = this.currentId;
            this.students.push(studentInstance);
        } catch (error) {
            throw new Error("Error Occurred");
        }

        return studentInstance;
    }

    update(studentInstance) {
        let student;
        try {
            student = this.students.find((x) => x.id === studentInstance.id);
            if (student) {
                Object.assign(student, { studentInstance });
            }
        } catch (error) {
            throw new Error("Error Occurred");
        }

        return student;
    }

    delete(studentId) {
        try {
            const studentIndex = this.students.findIndex(
                (x) => x.id === studentId
            );
            if (studentIndex !== -1) {
                this.students.splice(studentIndex, 1);
            }
        } catch (error) {
            throw new Error("Error Occurred");
        }

        return true;
    }

    getById(studentId) {
        let student;
        try {
            const id = parseInt(studentId);
            student = this.students.find((x) => x.id === id);
        } catch (err) {
            throw new Error("Error Occurred");
        }

        return student;
    }

    getByEmail(studentEmail) {
        let student;
        try {
            student = this.students.find((x) => x.email === studentEmail);
        } catch (err) {
            throw new Error("Error Occurred");
        }

        return student;
    }

    getAll() {
        return this.students;
    }

    addEnrollment(studentId, enrollment) {
        const id = parseInt(studentId);
        const student = this.students.find((x) => x.id === id);

        if (!student) {
            throw new Error("student does not exist");
        }

        if (!student.enrollments) {
            student.enrollments = [];
        }
        student.enrollments.push(enrollment);

        return student;
    }
};
