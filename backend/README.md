# Rabbi Mobile Credit - Backend API

## Description

API REST pour l'application Rabbi Mobile Credit - Plateforme de self-service pour l'achat automatisé de crédit téléphonique avec intégration Mobile Money.

## Caractéristiques

- 🔐 Authentification JWT sécurisée
- 💳 Intégration Mobile Money (MTN, Orange, Moov, Vodacom, Airtel)
- 📱 Achat automatisé de crédit téléphonique
- 📊 Gestion de stock en temps réel
- 💰 Suivi des transactions
- 🔒 Sécurité avec helmet et rate limiting
- 📈 Historique complet des opérations

## Installation

### Prérequis

- Node.js >= 14.x
- MongoDB >= 4.x
- npm ou yarn

### Installation des dépendances

```bash
cd backend
npm install
```

### Configuration

1. Copier le fichier `.env.example` vers `.env`
2. Configurer les variables d'environnement :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rabbi-credit
JWT_SECRET=votre_secret_jwt_tres_securise
MOMO_API_KEY=votre_cle_api
AIRTIME_API_KEY=votre_cle_airtime
```

## Démarrage

### Mode développement

```bash
npm run dev
```

### Mode production

```bash
npm start
```

## API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion

### Transactions

- `GET /api/transactions` - Liste des transactions
- `GET /api/transactions/:id` - Détails d'une transaction
- `POST /api/transactions/initiate` - Initier une transaction
- `GET /api/transactions/status/:reference` - Statut d'une transaction

### Crédits

- `POST /api/credits/purchase` - Acheter du crédit
- `GET /api/credits/operators` - Liste des opérateurs
- `GET /api/credits/packages/:operator` - Forfaits disponibles
- `GET /api/credits/history` - Historique des achats
- `GET /api/credits/balance` - Solde et stock

### Utilisateurs

- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Mettre à jour le profil
- `PUT /api/users/change-password` - Changer le mot de passe
- `GET /api/users/balance` - Consulter le solde
- `GET /api/users/stock` - Consulter le stock

## Architecture

```
backend/
├── src/
│   ├── controllers/     # Logique métier
│   ├── models/          # Modèles de données
│   ├── routes/          # Routes API
│   ├── middlewares/     # Middlewares (auth, validation)
│   ├── services/        # Services externes (Mobile Money, Airtime)
│   ├── utils/           # Utilitaires
│   └── server.js        # Point d'entrée
├── .env.example         # Exemple de configuration
├── package.json
└── README.md
```

## Sécurité

- Mots de passe hashés avec bcrypt
- Authentification JWT
- Rate limiting pour prévenir les abus
- Helmet pour les headers de sécurité
- Validation des données

## Contribution

Les contributions sont les bienvenues !

## Licence

MIT
