const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// Toutes les routes nécessitent l'authentification
router.use(authenticate);

// Routes de transactions
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post('/initiate', transactionController.initiateTransaction);
router.post('/callback/momo', transactionController.momoCallback);
router.get('/status/:reference', transactionController.getTransactionStatus);

module.exports = router;
