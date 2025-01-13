// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Pour séparer les préoccupations et faciliter la gestion des connexions. 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En écoutant les signaux système (SIGTERM) et en effectuant les opérations de fermeture nécessaires.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = new MongoClient(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
    throw error;
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try {
    redisClient = redis.createClient({ url: config.redis.uri });
    await redisClient.connect();
    console.log('Redis connecté avec succès');
  } catch (error) {
    console.error('Erreur lors de la connexion à Redis :', error);
    throw error;
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  closeConnections,
  getMongoDb: () => db,
  getRedisClient: () => redisClient
};