// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En utilisant des clés uniques et des valeurs JSON.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des clés uniques et des valeurs JSON.

const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIS_URI });

client.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  // TODO: Implémenter une fonction générique de cache
  try {
    await client.set(key, JSON.stringify(data), {
      EX: ttl
    });
    console.log(`Data cached with key: ${key}`);
  } catch (error) {
    console.error('Error caching data:', error);
  }
}
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData
  };