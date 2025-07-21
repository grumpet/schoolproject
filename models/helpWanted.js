const db = require('../util/database');

module.exports = class HelpWanted {
    constructor(firstName, lastName, email, phone, position, experienceYears) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.position = position;
        this.experienceYears = experienceYears || 0;
    }
    
    save() {
        return db.execute(
            'INSERT INTO help_wanted (first_name, last_name, email, phone, position, experience_years) VALUES (?, ?, ?, ?, ?, ?)',
            [this.firstName, this.lastName, this.email, this.phone, this.position, this.experienceYears]
        );
    }
    
    static findAll() {
        return db.execute(`
            SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') as formatted_date
            FROM help_wanted 
            ORDER BY created_at DESC
        `);
    }
    
    static findById(id) {
        return db.execute('SELECT * FROM help_wanted WHERE id = ?', [id]);
    }
};