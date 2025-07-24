const HelpWanted = require('../models/helpWanted');
const path = require('path');

exports.getHelpWantedForm = (req, res, next) => {
    res.render('help_wanted/help_wanted_1');
};

exports.getViewApplicants = (req, res, next) => {
    res.render('help_wanted/view_applicants');
};
exports.postHelpWanted = async (req, res, next) => {
    const { firstName, lastName, email, phone, position, experienceYears } = req.body;
    
    try {
        const application = new HelpWanted(
            firstName,
            lastName,
            email,
            phone,
            position,
            parseInt(experienceYears) || 0
        );
        
        await application.save();
        
        req.session.successMessage = 'Your job application has been submitted successfully! We will contact you soon.';
        res.redirect('/');
        
    } catch (err) {
        console.error('Error submitting job application:', err);
        req.session.errorMessage = 'An error occurred while submitting your application. Please try again.';
        res.redirect('/');
    }
};

exports.getAllApplications = async (req, res, next) => {
    try {
        const [applications] = await HelpWanted.findAll();
        res.json(applications);
    } catch (err) {
        console.error('Error fetching applications:', err);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};