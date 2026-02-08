const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['achat_credit', 'depot', 'retrait'],
    required: true
  },
  montant: {
    type: Number,
    required: true,
    min: 0
  },
  numeroTelephone: {
    type: String,
    required: true
  },
  operateur: {
    type: String,
    enum: ['MTN', 'Orange', 'Moov', 'Vodacom', 'Airtel'],
    required: true
  },
  methodePaiement: {
    type: String,
    enum: ['mobile_money', 'compte'],
    default: 'mobile_money'
  },
  statut: {
    type: String,
    enum: ['en_attente', 'reussi', 'echoue', 'annule'],
    default: 'en_attente'
  },
  referenceTransaction: {
    type: String,
    unique: true,
    required: true
  },
  referenceMobileMoney: {
    type: String
  },
  referenceCredit: {
    type: String
  },
  messageErreur: {
    type: String
  },
  dateTransaction: {
    type: Date,
    default: Date.now
  },
  dateTraitement: {
    type: Date
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances de recherche
transactionSchema.index({ utilisateur: 1, dateTransaction: -1 });
transactionSchema.index({ referenceTransaction: 1 });
transactionSchema.index({ statut: 1, dateTransaction: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
