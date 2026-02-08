const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par fenêtre
});
app.use('/api/', limiter);

// Routes
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const creditRoutes = require('./routes/credit.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/users', userRoutes);

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Rabbi Credit API is running' });
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ Connecté à MongoDB');
    app.listen(PORT, () => {
      console.log(`✓ Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('✗ Erreur de connexion MongoDB:', err);
    process.exit(1);
  });

module.exports = app;
