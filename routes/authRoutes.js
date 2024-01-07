const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// User registration
router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('phone_number').isMobilePhone(),
    body('name').isString().trim().notEmpty(),
    body('password').isString().trim().isLength({ min: 6 }),
  ],
  authController.signup
);

// User login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('phone_number').isMobilePhone(),
    body('password').isString().trim().isLength({ min: 6 }),
  ],
  authController.login
);

// Admin registration
router.post(
  '/signup/admin',
  [
    body('email').isEmail(),
    body('phone_number').isMobilePhone(),
    body('name').isString().trim().notEmpty(),
    body('password').isString().trim().isLength({ min: 6 }),
  ],
  authController.signupAdmin
);

module.exports = router;
