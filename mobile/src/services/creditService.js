import api from './api';

export const creditService = {
  // Acheter du crédit
  purchaseCredit: async (montant, numeroTelephone, operateur) => {
    try {
      const response = await api.post('/credits/purchase', {
        montant,
        numeroTelephone,
        operateur,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'achat' };
    }
  },

  // Récupérer la liste des opérateurs
  getOperators: async () => {
    try {
      const response = await api.get('/credits/operators');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des opérateurs' };
    }
  },

  // Récupérer les forfaits disponibles
  getPackages: async (operator) => {
    try {
      const response = await api.get(`/credits/packages/${operator}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des forfaits' };
    }
  },

  // Historique des achats
  getCreditHistory: async (page = 1) => {
    try {
      const response = await api.get(`/credits/history?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de l\'historique' };
    }
  },

  // Récupérer le solde
  getBalance: async () => {
    try {
      const response = await api.get('/credits/balance');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du solde' };
    }
  },
};
