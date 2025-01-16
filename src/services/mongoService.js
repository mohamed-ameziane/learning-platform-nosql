// Question: Pourquoi créer des services séparés ?
// Réponse: Pour séparer les responsabilités et avoir l'aspect de modularité.

const { ObjectId } = require('mongodb');


// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const objectId = ObjectId.createFromHexString(id);
    const result = await collection.findOne({ _id: objectId });
    return result;
  } catch (error) {
    console.error("Error finding document by ID:", error);
    throw error;
  }
}

const insertOne = async (collection, data) => {
  try {
    const result = await collection.insertOne(data);

    if (!result || !result.insertedId) {
      throw new Error("Document insertion failed. No insertedId returned.");
    }

    const insertedDocument = await collection.findOne({ _id: result.insertedId });
    console.log("Insert result:", result);
    return insertedDocument;
  } catch (error) {
    console.error("Error inserting document:", error);
    throw error;
  }
};

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne
};