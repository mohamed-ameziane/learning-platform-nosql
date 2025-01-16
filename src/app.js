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

const express = require("express");
const config = require("./config/env");
const { connectMongo, connectRedis } = require("./config/db");

const courseRoutes = require('./routes/courseRoutes');

const app = express();

async function startServer() {
  try {
    await connectMongo();
    await connectRedis();
    
    app.use('/api/courses', courseRoutes);
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
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