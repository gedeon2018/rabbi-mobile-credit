const express = require('express');
const router = express.Router();
const creditController = require('../controllers/credit.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// Toutes les routes nécessitent l'authentification
router.use(authenticate);

// Routes de gestion des crédits
router.post('/purchase', creditController.purchaseCredit);
router.get('/operators', creditController.getOperators);
router.get('/packages/:operator', creditController.getPackages);
router.get('/history', creditController.getCreditHistory);
router.get('/balance', creditController.getBalance);

module.exports = router;
