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

// Middleware to parse JSON request bodies
app.use(express.json()); 

async function startServer() {
  try {
    await connectMongo();
    await connectRedis();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
  
    app.use("/api/courses", courseRoutes);

    // Démarrer le serveur
    const port = config.port;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  await db.closeConnections();
  console.log("SIGTERM signal received: closing HTTP server");
  // Implémenter la fermeture propre des connexions
  if (mongoClient) {
    await mongoClient.close();
    console.log("MongoDB connection closed");
  }
  if (redisClient) {
    await redisClient.quit();
    console.log("Redis connection closed");
  }
  process.exit(0);
});

startServer();