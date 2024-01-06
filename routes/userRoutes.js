const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const { authorizeAdmin, authorizeUser } = require('../middlewares/authorization');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Modify user details (User can modify their own details)
router.put('/:userId', authenticateToken, authorizeUser, uploadMiddleware.single('profile_image'), userController.modifyUserDetails);

// Delete user account (User can delete their own account)
router.delete('/:userId', authenticateToken, authorizeUser, userController.deleteUser);

// View all users (Admin access required)
router.get('/all', authenticateToken, authorizeAdmin, userController.viewAllUsers);

// Modify user details by admin (Admin access required)
router.put('/admin/:userId', authenticateToken, authorizeAdmin, uploadMiddleware.single('profile_image'), userController.modifyUserDetailsByAdmin);

// Delete user account by admin (Admin access required)
router.delete('/admin/:userId', authenticateToken, authorizeAdmin, userController.deleteUserByAdmin);

module.exports = router;
