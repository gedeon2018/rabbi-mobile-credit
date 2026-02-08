# Rabbi Mobile Credit - Application Mobile

## Description

Application mobile pour l'achat automatisé de crédit téléphonique avec intégration Mobile Money. Une solution self-service complète pour les détaillants.

## Technologies

- React Native (Expo)
- Expo Router pour la navigation
- React Native Paper pour l'UI
- Axios pour les requêtes API
- AsyncStorage pour le stockage local
- Formik & Yup pour la validation des formulaires

## Fonctionnalités

✅ Authentification sécurisée
✅ Achat de crédit en temps réel
✅ Support multi-opérateurs (MTN, Orange, Moov, Vodacom, Airtel)
✅ Paiement via Mobile Money
✅ Historique des transactions
✅ Gestion du solde et du stock
✅ Interface utilisateur intuitive
✅ Mode hors ligne (coming soon)

## Installation

### Prérequis

- Node.js >= 14.x
- npm ou yarn
- Expo CLI : `npm install -g expo-cli`
- Pour Android : Android Studio ou un émulateur
- Pour iOS : Xcode (macOS uniquement)

### Installation des dépendances

```bash
cd mobile
npm install
```

### Configuration

Modifiez l'URL de l'API dans `src/services/api.js` :

```javascript
const API_URL = 'http://votre-api.com/api';
```

## Démarrage

### Démarrer le serveur de développement

```bash
npm start
```

### Lancer sur Android

```bash
npm run android
```

### Lancer sur iOS

```bash
npm run ios
```

### Lancer sur le Web

```bash
npm run web
```

## Structure du projet

```
mobile/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── contexts/        # Contextes React (Auth, etc.)
│   ├── screens/         # Écrans de l'application
│   ├── services/        # Services API
│   └── utils/           # Utilitaires
├── assets/              # Images et icônes
├── app.json             # Configuration Expo
├── package.json
└── README.md
```

## Écrans principaux

1. **Écran de connexion** - Authentification des utilisateurs
2. **Écran d'accueil** - Solde, stock, actions rapides
3. **Écran d'achat** - Sélection opérateur et montant
4. **Historique** - Liste des transactions
5. **Profil** - Informations utilisateur

## Build pour production

### Android

```bash
eas build --platform android
```

### iOS

```bash
eas build --platform ios
```

## Tests

```bash
npm test
```

## Contribution

Les contributions sont les bienvenues !

## Licence

MIT
