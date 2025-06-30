const db = require('../util/database');

module.exports = class Appointment {
    constructor(userId, name, email, phone, serviceId, date, time) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.serviceId = serviceId;
        this.date = date;
        this.time = time;
        this.status = 'pending'; 
    }
    
    save() {
        return db.execute(
            'INSERT INTO appointments (user_id, name, email, phone, service_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.userId, this.name, this.email, this.phone, this.serviceId, this.date, this.time, this.status]
        );
    }
    
    static findByUserId(userId) {
        return db.execute(`
            SELECT a.*, s.name as service_name, s.price as service_price 
            FROM appointments a 
            JOIN services s ON a.service_id = s.id 
            WHERE a.user_id = ? 
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `, [userId]);
    }
};
