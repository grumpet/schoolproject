const db = require('../util/database');

module.exports = class Survey {
    constructor(rating, barberId, comments, email) {
        this.rating = rating;
        this.barberId = barberId;
        this.comments = comments;
        this.email = email;
    }
    
    save() {
        return db.execute(
            'INSERT INTO survey_responses (rating, barber_id, comments, email) VALUES (?, ?, ?, ?)',
            [this.rating, this.barberId, this.comments, this.email]
        );
    }
    

}
