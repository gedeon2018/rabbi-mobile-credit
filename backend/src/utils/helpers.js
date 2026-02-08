const crypto = require('crypto');

/**
 * Génère une référence unique pour les transactions
 */
exports.generateReference = () => {
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `RBB${timestamp}${random}`;
};

/**
 * Formate un montant en devise
 */
exports.formatAmount = (amount, currency = 'FCFA') => {
  return `${amount.toLocaleString('fr-FR')} ${currency}`;
};

/**
 * Valide un numéro de téléphone
 */
exports.isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[0-9]{9,15}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * Masque un numéro de téléphone pour la sécurité
 */
exports.maskPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length < 4) return phoneNumber;
  return `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(phoneNumber.length - 2)}`;
};

/**
 * Calcule les frais de transaction
 */
exports.calculateFees = (amount, feePercentage = 0.01) => {
  return Math.round(amount * feePercentage);
};

/**
 * Vérifie si une transaction est dans les limites autorisées
 */
exports.isWithinLimits = (amount) => {
  const min = parseInt(process.env.MIN_TRANSACTION_AMOUNT) || 500;
  const max = parseInt(process.env.MAX_TRANSACTION_AMOUNT) || 100000;
  return amount >= min && amount <= max;
};
