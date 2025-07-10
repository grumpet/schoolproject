const db = require('../util/database');

module.exports = class Survey {
    constructor(rating, barberId, comments, email, serviceId, recommendation) {
        this.rating = rating;
        this.barberId = barberId;
        this.comments = comments;
        this.email = email;
        this.serviceId = serviceId;
        this.recommendation = recommendation;
    }
    
    save() {
        return db.execute(
            'INSERT INTO survey_responses (rating, barber_id, comments, email, service_id, recommendation) VALUES (?, ?, ?, ?, ?, ?)',
            [this.rating, this.barberId, this.comments, this.email, this.serviceId, this.recommendation]
        );
    }
    
    static findAll() {
        return db.execute(`
            SELECT sr.*, s.name as service_name, DATE_FORMAT(sr.created_at, '%Y-%m-%d %H:%i') as formatted_date
            FROM survey_responses sr 
            LEFT JOIN services s ON sr.service_id = s.id
            ORDER BY sr.created_at DESC
        `);
    }

}
