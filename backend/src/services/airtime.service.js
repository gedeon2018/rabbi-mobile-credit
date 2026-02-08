const axios = require('axios');

/**
 * Service pour gérer l'achat de crédit téléphonique
 * À adapter selon le fournisseur d'API airtime
 */

exports.purchaseAirtime = async (airtimeData) => {
  try {
    const { amount, phoneNumber, operator } = airtimeData;

    const apiConfig = {
      url: process.env.AIRTIME_API_URL,
      apiKey: process.env.AIRTIME_API_KEY,
      apiSecret: process.env.AIRTIME_API_SECRET
    };

    // Appel à l'API d'achat de crédit
    // EXEMPLE - À adapter selon votre fournisseur
    const response = await axios.post(
      `${apiConfig.url}/airtime/purchase`,
      {
        amount,
        phoneNumber,
        operator,
        country: 'CD' // À adapter selon le pays
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
        message: 'Crédit envoyé avec succès'
      };
    } else {
      return {
        success: false,
        error: response.data.message || 'Erreur lors de l\'envoi du crédit'
      };
    }
  } catch (error) {
    console.error('Erreur achat airtime:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de l\'achat de crédit'
    };
  }
};

exports.getOperatorFromPhoneNumber = (phoneNumber) => {
  // Logique pour déterminer l'opérateur basé sur le préfixe
  // À adapter selon votre région
  const prefix = phoneNumber.substring(0, 3);
  
  const operatorMap = {
    '081': 'Vodacom',
    '082': 'Vodacom',
    '089': 'Vodacom',
    '084': 'Orange',
    '085': 'Orange',
    '089': 'Orange',
    '097': 'Airtel',
    '099': 'Airtel'
  };

  return operatorMap[prefix] || 'Unknown';
};

exports.validatePhoneNumber = (phoneNumber) => {
  // Validation du numéro de téléphone
  const phoneRegex = /^[0-9]{9,10}$/;
  return phoneRegex.test(phoneNumber);
};
