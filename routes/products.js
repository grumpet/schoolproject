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

// Appointment booking
router.get('/book', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/book.html'));
});

// Process appointment booking
router.post('/book', barberController.saveAppointment);

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
