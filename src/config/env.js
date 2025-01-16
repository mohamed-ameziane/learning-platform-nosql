// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Afin de garantir que toutes les configurations essentielles au bon fonctionnement de l'application sont présentes, évitant les erreurs pendant l'exécution.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Le risque de ne pas démarrer ou de fonctionner incorrectement.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}


module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};