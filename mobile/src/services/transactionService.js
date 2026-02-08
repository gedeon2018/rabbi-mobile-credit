import api from './api';

export const transactionService = {
  // Récupérer toutes les transactions
  getTransactions: async (page = 1, type = null, statut = null) => {
    try {
      let url = `/transactions?page=${page}`;
      if (type) url += `&type=${type}`;
      if (statut) url += `&statut=${statut}`;
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des transactions' };
    }
  },

  // Récupérer une transaction par ID
  getTransactionById: async (id) => {
    try {
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de la transaction' };
    }
  },

  // Initier une transaction
  initiateTransaction: async (montant, numeroTelephone, operateur, type = 'depot') => {
    try {
      const response = await api.post('/transactions/initiate', {
        montant,
        numeroTelephone,
        operateur,
        type,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'initiation de la transaction' };
    }
  },

  // Vérifier le statut d'une transaction
  getTransactionStatus: async (reference) => {
    try {
      const response = await api.get(`/transactions/status/${reference}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la vérification du statut' };
    }
  },
};
