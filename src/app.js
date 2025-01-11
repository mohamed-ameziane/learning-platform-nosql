// Question: Comment organiser le point d'entrée de l'application ?
/* Reponse:
Initialiser la configuration (variables d'environnement, bases de données)
Configurer les middlewares
Monter les routes
Gérer les erreurs.
*/
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
/* Reponse: 
Utiliser une fonction asynchrone pour démarrer le serveur,
et gérer les erreurs avec un bloc try/catch.
*/  

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // 1. Initialiser les connexions aux bases de données
    console.log('Connecting to the database...');
    await db.connect(); // Connexion à MongoDB (via `config/db.js`)
    console.log('Database connected successfully.');

    // 2. Configurer les middlewares Express
    app.use(cors()); // Gestion des CORS
    app.use(bodyParser.json()); // Parser les requêtes JSON
    app.use(morgan('dev')); // Logger HTTP

    // 3. Monter les routes
    app.use('/api/courses', courseRoutes); // Route pour les cours
    app.use('/api/students', studentRoutes); // Route pour les étudiants

    // 4. Démarrer le serveur
    const PORT = config.PORT || 3000; // Récupérer le port depuis les variables d'environnement
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing the server...');
  try {
    await db.disconnect(); // Fermer la connexion à MongoDB
    console.log('Database connection closed.');
    process.exit(0); // Arrêt propre
  } catch (error) {
    console.error('Error during server shutdown:', error.message);
    process.exit(1); // Arrêt forcé
  }
});

startServer();