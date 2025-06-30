const express = require('express');
const path = require('path');
const router = express.Router();
const barberController = require('../controllers/barber');
const authController = require('../controllers/auth');
const authMiddleware = require('../util/auth');

// Home page
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Authentication routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.post('/logout', authController.postLogout);

// Services menu
router.get('/menu', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/menu.html'));
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
