const axios = require('axios');

/**
 * Service pour gérer les paiements Mobile Money
 * À adapter selon le fournisseur de service (MTN, Orange, etc.)
 */

exports.processMobileMoneyPayment = async (paymentData) => {
  try {
    const { amount, phoneNumber, operator, reference } = paymentData;

    // Configuration de l'API selon l'opérateur
    const apiConfig = {
      url: process.env.MOMO_API_URL,
      apiKey: process.env.MOMO_API_KEY,
      apiSecret: process.env.MOMO_API_SECRET
    };

    // Appel à l'API Mobile Money
    // EXEMPLE - À adapter selon votre fournisseur
    const response = await axios.post(
      `${apiConfig.url}/payments/request`,
      {
        amount,
        phoneNumber,
        operator,
        reference,
        callbackUrl: process.env.MOMO_CALLBACK_URL
      },
      {
        headers: {
          'Authorization': `Bearer ${apiConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      return {
        success: true,
        reference: response.data.transactionId,
        message: 'Paiement initié'
      };
    } else {
      return {
        success: false,
        error: response.data.message || 'Erreur lors du paiement'
      };
    }
  } catch (error) {
    console.error('Erreur Mobile Money:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors du traitement du paiement'
    };
  }
};

exports.checkPaymentStatus = async (transactionId) => {
  try {
    const apiConfig = {
      url: process.env.MOMO_API_URL,
      apiKey: process.env.MOMO_API_KEY
    };

    const response = await axios.get(
      `${apiConfig.url}/payments/${transactionId}/status`,
      {
        headers: {
          'Authorization': `Bearer ${apiConfig.apiKey}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erreur vérification statut:', error);
    return null;
  }
};
