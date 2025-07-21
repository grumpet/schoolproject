const express = require('express');
const path = require('path');
const router = express.Router();
const barberController = require('../controllers/barber');
const authController = require('../controllers/auth');
const authMiddleware = require('../util/auth');
const Appointment = require('../models/appointment');
const helpWantedController = require('../controllers/helpWanted');

// Help Wanted routes
router.get('/help-wanted', helpWantedController.getHelpWantedForm);
router.get('/help_wanted_1', helpWantedController.getHelpWantedForm);
router.get('/help_wanted_2', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/help_wanted/help_wanted_2.html'));
});
router.post('/help-wanted-review', helpWantedController.postHelpWanted);
router.get('/view-applicants', authMiddleware.requireAuth, helpWantedController.getViewApplicants);
router.get('/api/applicants', authMiddleware.requireAuth, helpWantedController.getAllApplications);

// Home page
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Profile page 
router.get('/profiles', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/profiles.html'));
});

// Individual barber profiles
router.get('/profiles/:name', (req, res, next) => {
  const barberName = req.params.name;
  res.sendFile(path.join(__dirname, `../views/${barberName}.html`));
});
// Authentication routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.post('/logout', authController.postLogout);


// Dashboard (protected route)
router.get('/dashboard', authMiddleware.requireAuth, barberController.getDashboard);

// Feedback page (protected route)
router.get('/feedback', authMiddleware.requireAuth, barberController.getFeedback);

// API endpoint to fetch all feedback
router.get('/api/feedback', authMiddleware.requireAuth, async (req, res, next) => {
    try {
        const Survey = require('../models/survey');
        const [feedback] = await Survey.findAll();
        res.json(feedback);
    } catch (err) {
        console.error('Error fetching feedback:', err);
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
});

// API endpoint to fetch user's appointments
router.get('/api/my-appointments', authMiddleware.requireAuth, async (req, res, next) => {
    try {
        const [appointments] = await Appointment.findByUserId(req.session.userId);
        res.json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Appointment booking (protected routes)
router.get('/signup', authMiddleware.requireAuth, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

router.post('/signup', authMiddleware.requireAuth, barberController.saveAppointment);

// Customer survey (protected routes)
router.get('/survey', authMiddleware.requireAuth, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/survey.html'));
});

router.post('/survey', authMiddleware.requireAuth, barberController.saveSurvey);

// FAQ page
router.get('/qa', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/qa.html'));
});

// 404 handler
router.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/404.html'));
});

module.exports = router;
