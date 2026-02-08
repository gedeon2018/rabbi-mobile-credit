const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// Génère un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { nom, prenom, telephone, email, motDePasse, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ telephone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Un compte existe déjà avec ce numéro de téléphone'
      });
    }

    // Créer le nouvel utilisateur
    const user = await User.create({
      nom,
      prenom,
      telephone,
      email,
      motDePasse,
      role: role || 'detaillant'
    });

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      data: {
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          telephone: user.telephone,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du compte',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { telephone, motDePasse } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ telephone });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(motDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    // Vérifier si le compte est actif
    if (!user.actif) {
      return res.status(403).json({
        success: false,
        message: 'Votre compte est désactivé. Contactez l\'administrateur.'
      });
    }

    // Mettre à jour la dernière connexion
    user.derniereConnexion = new Date();
    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          telephone: user.telephone,
          role: user.role,
          solde: user.solde,
          stockCredits: user.stockCredits
        },
        token
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};

exports.logout = async (req, res) => {
  // Dans une implémentation réelle avec des refresh tokens,
  // on invaliderait le token ici
  res.status(200).json({
    success: true,
    message: 'Déconnexion réussie'
  });
};

exports.refreshToken = async (req, res) => {
  // À implémenter selon vos besoins
  res.status(501).json({
    success: false,
    message: 'Fonctionnalité non implémentée'
  });
};

exports.forgotPassword = async (req, res) => {
  // À implémenter avec envoi de SMS ou email
  res.status(501).json({
    success: false,
    message: 'Fonctionnalité non implémentée'
  });
};

exports.resetPassword = async (req, res) => {
  // À implémenter
  res.status(501).json({
    success: false,
    message: 'Fonctionnalité non implémentée'
  });
};
