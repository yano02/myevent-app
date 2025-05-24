const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const { Event, Invitee } = require('./models');
const eventRoutes = require('./routes/eventRoutes');
const inviteeRoutes = require('./routes/inviteeRoutes');

// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour gérer les erreurs CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/events', eventRoutes);
app.use('/invitees', inviteeRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de gestion d\'événements' });
});

// Middleware de gestion d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur interne est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Middleware pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Synchronisation avec la base de données et démarrage du serveur
async function startServer() {
  try {
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ alter: true });
    console.log('Connexion à la base de données établie avec succès');

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur en écoute sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
}

// Démarrer le serveur
startServer(); 