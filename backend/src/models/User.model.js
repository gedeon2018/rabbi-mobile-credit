const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{9,15}$/
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true
  },
  motDePasse: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['detaillant', 'vendeur', 'admin'],
    default: 'detaillant'
  },
  solde: {
    type: Number,
    default: 0,
    min: 0
  },
  stockCredits: {
    type: Number,
    default: 0,
    min: 0
  },
  actif: {
    type: Boolean,
    default: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  derniereConnexion: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash le mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 12);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
