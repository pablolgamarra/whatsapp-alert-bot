const userDB = require('../data/user.data');

class User {
    constructor(id, name, lastname, email) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
    }

    validateData(id, name, lastname, email) {
        if (id <= 0 || !id) {
            throw new Error('ID cannot be minor than zero');
        } else if (name === '' || name === ' ' || !name) {
            throw new Error('Name cannot be blank or white space');
        } else if (lastname === '' || lastname === ' ' || !lastname) {
            throw new Error('Name cannot be blank or white space');
        }
    }
}

module.exports = User;