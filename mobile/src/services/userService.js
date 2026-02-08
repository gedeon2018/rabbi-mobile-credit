import api from './api';

export const userService = {
  // Récupérer le profil
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du profil' };
    }
  },

  // Mettre à jour le profil
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la mise à jour du profil' };
    }
  },

  // Changer le mot de passe
  changePassword: async (ancienMotDePasse, nouveauMotDePasse) => {
    try {
      const response = await api.put('/users/change-password', {
        ancienMotDePasse,
        nouveauMotDePasse,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors du changement de mot de passe' };
    }
  },

  // Récupérer le solde
  getBalance: async () => {
    try {
      const response = await api.get('/users/balance');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du solde' };
    }
  },

  // Récupérer le stock
  getStock: async () => {
    try {
      const response = await api.get('/users/stock');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du stock' };
    }
  },
};
