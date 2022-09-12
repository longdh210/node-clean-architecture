const Student = require("../../entities/Student");

module.exports = (StudentRepository, CrmServices) => {
    async function Execute(firstName, lastName, email) {
        const student = await StudentRepository.getByEmail(email);

        // Validate
        if (!firstName || !lastName || !email) {
            throw new Error("validation failed");
        }

        // Check if student exist by email
        if (student) {
            throw new Error("email already exist in the system");
        }

        // Create new student object
        let newStudent = new Student(firstName, lastName, email);

        // Persist student
        newStudent = await StudentRepository.add(newStudent);

        // Notify crm system
        await CrmServices.notify(newStudent);

        return "student added successfully";
    }

    return {
        Execute,
    };
};
