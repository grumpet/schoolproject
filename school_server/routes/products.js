const express = require('express');
const path = require('path');
const router = express.Router();
const barberController = require('../controllers/barber');

// Home page
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Services menu
router.get('/menu', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/menu.html'));
});

// Appointment signup
router.get('/signup', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Process appointment booking
router.post('/signup', barberController.saveAppointment);

// Customer survey
router.get('/survey', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/survey.html'));
});

// Process survey submission
router.post('/survey', barberController.saveSurvey);

// FAQ page
router.get('/qa', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/qa.html'));
});

// 404 handler
router.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/404.html'));
});

module.exports = router;
