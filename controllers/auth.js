const User = require('../models/user');
const path = require('path');

exports.getLogin = (req, res, next) => {
    const errorMessage = req.session.errorMessage;
    req.session.errorMessage = null; 
    if (errorMessage) {

        res.redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
    } else {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }
};

exports.getRegister = (req, res, next) => {
    const errorMessage = req.session.errorMessage;
    req.session.errorMessage = null; 
    
    if (errorMessage) {
        res.redirect(`/register?error=${encodeURIComponent(errorMessage)}`);
    } else {
        res.sendFile(path.join(__dirname, '../views/register.html'));
    }
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const [users] = await User.findByEmail(email);
        
        if (users.length === 0) {
            console.log('User not found');
            req.session.errorMessage = 'Invalid email or password. Please try again.';
            return res.redirect('/login');
        }
        
        const user = users[0];
        const isValidPassword = await User.validatePassword(password, user.password);
        
        if (!isValidPassword) {
            console.log('Invalid password');
            req.session.errorMessage = 'Invalid email or password. Please try again.';
            return res.redirect('/login');
        }
        
        req.session.userId = user.id;
        req.session.userEmail = user.email;
        req.session.userName = `${user.first_name} ${user.last_name}`;
        req.session.isLoggedIn = true;
        
        console.log('User logged in successfully');
        res.redirect('/');
    } catch (err) {
        console.error('Login error:', err);
        req.session.errorMessage = 'An error occurred during login. Please try again.';
        res.redirect('/login');
    }
};

exports.postRegister = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        req.session.errorMessage = 'Passwords do not match. Please try again.';
        return res.redirect('/register');
    }
    
    try {
        const [existingUsers] = await User.findByEmail(email);
        
        if (existingUsers.length > 0) {
            console.log('User already exists');
            req.session.errorMessage = 'An account with this email already exists. Please use a different email or login instead.';
            return res.redirect('/register');
        }
        
        const user = new User(firstName, lastName, email, password);
        await user.save();
        
        console.log('User registered successfully');
        req.session.successMessage = 'Registration successful! Please login with your credentials.';
        res.redirect('/login');
    } catch (err) {
        console.error('Registration error:', err);
        req.session.errorMessage = 'An error occurred during registration. Please try again.';
        res.redirect('/register');
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
};