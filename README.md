# Rabbi Mobile Credit 📱💳

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4%2B-green.svg)](https://www.mongodb.com/)

Application mobile de self-service pour l'achat automatisé de crédit téléphonique avec intégration Mobile Money. Une solution complète pour les détaillants qui souhaitent vendre du crédit sans intervention manuelle.

## 🎯 Concept

Rabbi Mobile Credit est une plateforme innovante qui permet aux détaillants d'acheter du crédit téléphonique de manière entièrement automatisée :

1. **Le client choisit** le montant de crédit désiré
2. **Le client paie** via Mobile Money (MTN, Orange, Moov, Vodacom, Airtel)
3. **Le système crédite** automatiquement le compte du client en temps réel
4. **Le vendeur constate** l'entrée d'argent et la diminution de son stock

✨ **Zéro intervention manuelle du vendeur !**

## ✨ Fonctionnalités principales

### Pour les détaillants
- 🔐 Authentification sécurisée
- 📱 Achat de crédit multi-opérateurs
- 💳 Paiement Mobile Money intégré
- 📊 Suivi du solde en temps réel
- 📦 Gestion automatique du stock
- 📈 Historique complet des transactions
- 🔔 Notifications instantanées

### Pour les vendeurs
- 💰 Visualisation des revenus
- 📉 Suivi de la diminution du stock
- 📊 Rapports et statistiques
- 🎯 Tableau de bord administrateur

## 🏗️ Architecture

```
rabbi-mobile-credit/
├── backend/                 # API REST Node.js + Express
│   ├── src/
│   │   ├── controllers/    # Logique métier
│   │   ├── models/         # Modèles MongoDB
│   │   ├── routes/         # Routes API
│   │   ├── middlewares/    # Auth, validation
│   │   ├── services/       # Mobile Money, Airtime
│   │   └── utils/          # Utilitaires
│   └── README.md
│
└── mobile/                  # Application React Native
    ├── src/
    │   ├── components/     # Composants UI
    │   ├── screens/        # Écrans
    │   ├── services/       # Services API
    │   ├── contexts/       # React Context
    │   └── utils/          # Helpers
    └── README.md
```

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** >= 14.x
- **MongoDB** >= 4.x
- **npm** ou **yarn**
- **Expo CLI** pour le mobile

### Installation du Backend

```bash
# Cloner le repository
git clone https://github.com/gedeon2018/rabbi-mobile-credit.git
cd rabbi-mobile-credit/backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Démarrer le serveur
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`

### Installation du Mobile

```bash
cd mobile

# Installer les dépendances
npm install

# Démarrer l'application
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios
```

## 📱 Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **Bcrypt** - Hashage des mots de passe
- **Axios** - Client HTTP
- **Helmet** - Sécurité
- **Winston** - Logging

### Mobile
- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **React Navigation** - Navigation
- **AsyncStorage** - Stockage local
- **Axios** - Client HTTP
- **Formik & Yup** - Validation de formulaires
- **React Native Paper** - Composants UI

## 🔌 Intégrations

### APIs de paiement Mobile Money
- MTN Mobile Money
- Orange Money
- Moov Money
- Vodacom M-Pesa
- Airtel Money

### APIs d'achat de crédit (Airtime)
- AfricasTalking
- Reloadly
- Ding
- Autres fournisseurs

## 📊 Endpoints API

### Authentification
```
POST   /api/auth/register        # Inscription
POST   /api/auth/login           # Connexion
POST   /api/auth/logout          # Déconnexion
```

### Transactions
```
GET    /api/transactions         # Liste des transactions
GET    /api/transactions/:id     # Détails d'une transaction
POST   /api/transactions/initiate # Initier une transaction
GET    /api/transactions/status/:ref # Statut d'une transaction
```

### Crédits
```
POST   /api/credits/purchase     # Acheter du crédit
GET    /api/credits/operators    # Liste des opérateurs
GET    /api/credits/packages/:op # Forfaits disponibles
GET    /api/credits/history      # Historique des achats
GET    /api/credits/balance      # Solde et stock
```

### Utilisateurs
```
GET    /api/users/profile        # Profil utilisateur
PUT    /api/users/profile        # Mettre à jour le profil
PUT    /api/users/change-password # Changer le mot de passe
GET    /api/users/balance        # Consulter le solde
GET    /api/users/stock          # Consulter le stock
```

## 🔒 Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ Authentification JWT
- ✅ Rate limiting pour prévenir les abus
- ✅ Helmet pour les headers de sécurité
- ✅ Validation des données d'entrée
- ✅ HTTPS obligatoire en production
- ✅ Chiffrement des données sensibles

## 📸 Screenshots

*À venir...*

## 🗺️ Roadmap

### Phase 1 - MVP (En cours)
- [x] Structure du projet
- [x] Backend API
- [x] Application mobile de base
- [ ] Intégration Mobile Money
- [ ] Intégration Airtime API
- [ ] Tests et validation

### Phase 2 - Améliorations
- [ ] Dashboard administrateur web
- [ ] Notifications push
- [ ] Mode hors ligne
- [ ] Support multi-langue
- [ ] Système de rapports avancés

### Phase 3 - Évolution
- [ ] Programme de fidélité
- [ ] Paiement par carte bancaire
- [ ] API publique pour intégration
- [ ] Application vendeur dédiée

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Gedeon** - *Développeur principal* - [@gedeon2018](https://github.com/gedeon2018)

## 🙏 Remerciements

- Merci à tous les contributeurs
- Inspiration des plateformes de mobile banking africaines
- La communauté React Native et Node.js

## 📞 Contact

Pour toute question ou suggestion :

- Email : contact@rabbi-credit.com
- GitHub Issues : [Créer une issue](https://github.com/gedeon2018/rabbi-mobile-credit/issues)

## 🌟 Support

Si vous trouvez ce projet utile, n'hésitez pas à lui donner une ⭐️ !

---

**Fait avec ❤️ pour simplifier l'achat de crédit téléphonique en Afrique**
