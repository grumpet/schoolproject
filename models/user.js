const db = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    
    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        return db.execute(
            'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
            [this.firstName, this.lastName, this.email, hashedPassword]
        );
    }
    
    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
    
    static async validatePassword(inputPassword, hashedPassword) {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }
};