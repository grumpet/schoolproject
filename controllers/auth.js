const User = require('../models/user');
const path = require('path');

exports.getLogin = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
};

exports.getRegister = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const [users] = await User.findByEmail(email);
        
        if (users.length === 0) {
            console.log('User not found');
            return res.redirect('/login');
        }
        
        const user = users[0];
        const isValidPassword = await User.validatePassword(password, user.password);
        
        if (!isValidPassword) {
            console.log('Invalid password');
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
        res.redirect('/login');
    }
};

exports.postRegister = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return res.redirect('/register');
    }
    
    try {
        const [existingUsers] = await User.findByEmail(email);
        
        if (existingUsers.length > 0) {
            console.log('User already exists');
            return res.redirect('/register');
        }
        
        const user = new User(firstName, lastName, email, password);
        await user.save();
        
        console.log('User registered successfully');
        res.redirect('/login');
    } catch (err) {
        console.error('Registration error:', err);
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