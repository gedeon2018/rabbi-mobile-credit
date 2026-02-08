const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Toutes les routes nécessitent l'authentification
router.use(authenticate);

// Routes utilisateur
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/change-password', userController.changePassword);
router.get('/balance', userController.getBalance);
router.get('/stock', userController.getStock);

// Routes admin uniquement
router.get('/all', authorize('admin'), userController.getAllUsers);
router.put('/:id/activate', authorize('admin'), userController.activateUser);
router.put('/:id/deactivate', authorize('admin'), userController.deactivateUser);

module.exports = router;
