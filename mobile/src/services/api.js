import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL de l'API - à modifier selon votre environnement
const API_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://votre-api-production.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      // Rediriger vers la page de connexion
    }
    return Promise.reject(error);
  }
);

export default api;
