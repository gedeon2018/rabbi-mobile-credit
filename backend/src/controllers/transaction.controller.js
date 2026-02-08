const Transaction = require('../models/Transaction.model');
const User = require('../models/User.model');
const { processMobileMoneyPayment } = require('../services/mobilemoney.service');
const { generateReference } = require('../utils/helpers');

exports.initiateTransaction = async (req, res) => {
  try {
    const { montant, numeroTelephone, operateur, type } = req.body;
    const userId = req.user.id;

    // Créer la transaction
    const transaction = await Transaction.create({
      utilisateur: userId,
      type: type || 'depot',
      montant,
      numeroTelephone,
      operateur,
      methodePaiement: 'mobile_money',
      referenceTransaction: generateReference(),
      statut: 'en_attente'
    });

    // Initier le paiement Mobile Money
    const paymentResult = await processMobileMoneyPayment({
      amount: montant,
      phoneNumber: numeroTelephone,
      operator: operateur,
      reference: transaction.referenceTransaction
    });

    if (paymentResult.success) {
      transaction.referenceMobileMoney = paymentResult.reference;
      await transaction.save();

      res.status(200).json({
        success: true,
        message: 'Transaction initiée. Confirmez le paiement sur votre téléphone.',
        data: {
          reference: transaction.referenceTransaction,
          montant: transaction.montant
        }
      });
    } else {
      transaction.statut = 'echoue';
      transaction.messageErreur = paymentResult.error;
      await transaction.save();

      res.status(400).json({
        success: false,
        message: 'Échec de l\'initiation du paiement',
        error: paymentResult.error
      });
    }
  } catch (error) {
    console.error('Erreur lors de l\'initiation de la transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'initiation de la transaction',
      error: error.message
    });
  }
};

exports.momoCallback = async (req, res) => {
  try {
    const { reference, status, momoReference } = req.body;

    const transaction = await Transaction.findOne({ referenceTransaction: reference });
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction non trouvée'
      });
    }

    if (status === 'success') {
      transaction.statut = 'reussi';
      transaction.referenceMobileMoney = momoReference;
      transaction.dateTraitement = new Date();

      // Mettre à jour le solde de l'utilisateur
      const user = await User.findById(transaction.utilisateur);
      if (user && transaction.type === 'depot') {
        user.solde += transaction.montant;
        await user.save();
      }
    } else {
      transaction.statut = 'echoue';
      transaction.messageErreur = 'Paiement échoué';
      transaction.dateTraitement = new Date();
    }

    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'Callback traité'
    });
  } catch (error) {
    console.error('Erreur lors du traitement du callback:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du traitement du callback',
      error: error.message
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, type, statut } = req.query;

    const query = { utilisateur: userId };
    if (type) query.type = type;
    if (statut) query.statut = statut;

    const transactions = await Transaction.find(query)
      .sort({ dateTransaction: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        transactions,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des transactions',
      error: error.message
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
      _id: id,
      utilisateur: userId
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la transaction',
      error: error.message
    });
  }
};

exports.getTransactionStatus = async (req, res) => {
  try {
    const { reference } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
      referenceTransaction: reference,
      utilisateur: userId
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        reference: transaction.referenceTransaction,
        statut: transaction.statut,
        montant: transaction.montant,
        dateTransaction: transaction.dateTransaction
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du statut',
      error: error.message
    });
  }
};
