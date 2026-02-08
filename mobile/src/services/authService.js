import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  // Inscription
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        await AsyncStorage.setItem('authToken', response.data.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'inscription' };
    }
  },

  // Connexion
  login: async (telephone, motDePasse) => {
    try {
      const response = await api.post('/auth/login', { telephone, motDePasse });
      if (response.data.success) {
        await AsyncStorage.setItem('authToken', response.data.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la connexion' };
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.post('/auth/logout');
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      return { success: true };
    } catch (error) {
      // Même en cas d'erreur, on supprime les données locales
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      return { success: true };
    }
  },

  // Vérifier l'authentification
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  },

  // Récupérer les données utilisateur stockées
  getUserData: async () => {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },
};
