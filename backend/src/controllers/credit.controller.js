const Transaction = require('../models/Transaction.model');
const User = require('../models/User.model');
const { purchaseAirtime } = require('../services/airtime.service');
const { generateReference } = require('../utils/helpers');

exports.purchaseCredit = async (req, res) => {
  try {
    const { montant, numeroTelephone, operateur } = req.body;
    const userId = req.user.id;

    // Validation
    if (!montant || !numeroTelephone || !operateur) {
      return res.status(400).json({
        success: false,
        message: 'Données manquantes'
      });
    }

    // Vérifier les limites
    const minAmount = parseInt(process.env.MIN_TRANSACTION_AMOUNT) || 500;
    const maxAmount = parseInt(process.env.MAX_TRANSACTION_AMOUNT) || 100000;

    if (montant < minAmount || montant > maxAmount) {
      return res.status(400).json({
        success: false,
        message: `Le montant doit être entre ${minAmount} et ${maxAmount}`
      });
    }

    // Créer la transaction
    const transaction = await Transaction.create({
      utilisateur: userId,
      type: 'achat_credit',
      montant,
      numeroTelephone,
      operateur,
      referenceTransaction: generateReference(),
      statut: 'en_attente'
    });

    // Traiter l'achat de crédit via l'API
    const result = await purchaseAirtime({
      amount: montant,
      phoneNumber: numeroTelephone,
      operator: operateur
    });

    if (result.success) {
      transaction.statut = 'reussi';
      transaction.referenceCredit = result.reference;
      transaction.dateTraitement = new Date();
      await transaction.save();

      // Mettre à jour le stock du vendeur (si applicable)
      // Cette logique dépend de votre modèle métier

      res.status(200).json({
        success: true,
        message: 'Crédit acheté avec succès',
        data: {
          transaction: {
            reference: transaction.referenceTransaction,
            montant: transaction.montant,
            numeroTelephone: transaction.numeroTelephone,
            operateur: transaction.operateur,
            statut: transaction.statut
          }
        }
      });
    } else {
      transaction.statut = 'echoue';
      transaction.messageErreur = result.error;
      transaction.dateTraitement = new Date();
      await transaction.save();

      res.status(400).json({
        success: false,
        message: 'Échec de l\'achat de crédit',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Erreur lors de l\'achat de crédit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'achat de crédit',
      error: error.message
    });
  }
};

exports.getOperators = async (req, res) => {
  try {
    const operators = [
      { code: 'MTN', nom: 'MTN', actif: true },
      { code: 'Orange', nom: 'Orange Money', actif: true },
      { code: 'Moov', nom: 'Moov Money', actif: true },
      { code: 'Vodacom', nom: 'Vodacom M-Pesa', actif: true },
      { code: 'Airtel', nom: 'Airtel Money', actif: true }
    ];

    res.status(200).json({
      success: true,
      data: operators
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des opérateurs',
      error: error.message
    });
  }
};

exports.getPackages = async (req, res) => {
  try {
    const { operator } = req.params;

    // Packages standards (à adapter selon vos besoins)
    const packages = [
      { montant: 500, description: '500 FCFA de crédit' },
      { montant: 1000, description: '1000 FCFA de crédit' },
      { montant: 2000, description: '2000 FCFA de crédit' },
      { montant: 5000, description: '5000 FCFA de crédit' },
      { montant: 10000, description: '10000 FCFA de crédit' }
    ];

    res.status(200).json({
      success: true,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des forfaits',
      error: error.message
    });
  }
};

exports.getCreditHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;

    const transactions = await Transaction.find({
      utilisateur: userId,
      type: 'achat_credit'
    })
      .sort({ dateTransaction: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Transaction.countDocuments({
      utilisateur: userId,
      type: 'achat_credit'
    });

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
      message: 'Erreur lors de la récupération de l\'historique',
      error: error.message
    });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('solde stockCredits');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        solde: user.solde,
        stockCredits: user.stockCredits
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du solde',
      error: error.message
    });
  }
};
