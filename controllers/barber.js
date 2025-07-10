const Appointment = require('../models/appointment');
const Survey = require('../models/survey');
const path = require('path');

exports.getDashboard = async (req, res, next) => {
    try {
        const [appointments] = await Appointment.findByUserId(req.session.userId);
        res.sendFile(path.join(__dirname, '../views/dashboard.html'));
        
    } catch (err) {
        console.error('Error fetching user appointments:', err);
        res.redirect('/');
    }
};

exports.getFeedback = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../views/feedback.html'));
    } catch (err) {
        console.error('Error loading feedback page:', err);
        res.redirect('/');
    }
};

exports.saveAppointment = (req, res, next) => {
    const { name, email, phone, serviceId, date, time } = req.body;
    
    const appointment = new Appointment(
        req.session.userId, 
        name,
        email,
        phone,
        serviceId,
        date,
        time
    );
    
    appointment.save()
        .then(() => {
            console.log('Appointment booked successfully');
            res.redirect('/dashboard'); 
        })
        .catch(err => {
            console.error('Error booking appointment:', err);
            res.redirect('/signup');
        });
};

exports.saveSurvey = (req, res, next) => {
    const { rating, barberId, comments, email, serviceId, recommendation } = req.body;
    
    const survey = new Survey(
        rating,
        barberId || null,
        comments,
        email || null,
        serviceId || null,
        recommendation || null
    );
    
    survey.save()
        .then(() => {
            console.log('Survey submitted successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error submitting survey:', err);
            res.redirect('/survey');
        });
};
