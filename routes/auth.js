const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { body } = require('express-validator');

const authController = require('../controllers/auth');

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {}) => {
            return User.findOne({
                        email: value
                    })
                    .then(user => {
                        console.log(user);
                        if (user) {
                            return Promise.reject('Email address already exists!');
                        }
                    });
        })
        .normalizeEmail(),
    body('password').trim().isLength({ min: 5}),
    body('name').trim().not().isEmpty()
], authController.signup);

module.exports = router;