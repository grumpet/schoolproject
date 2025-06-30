const Appointment = require('../models/appointment');
const Survey = require('../models/survey');

exports.saveAppointment = (req, res, next) => {
    const { name, email, phone, serviceId, date, time } = req.body;
    
    const appointment = new Appointment(
        null, 
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
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error booking appointment:', err);
            res.redirect('/signup');
        });
};

exports.saveSurvey = (req, res, next) => {
    const { rating, barberId, comments, email } = req.body;
    
    const survey = new Survey(
        rating,
        barberId || null,
        comments,
        email || null
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
