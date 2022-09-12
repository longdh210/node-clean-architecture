module.exports = class Student {
    constructor(firstname, lastname, email, enrollments) {
        this.id = null;
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = `${firstname} ${lastname}`;
        this.email = email;
        this.enrollments = enrollments;
    }
};
