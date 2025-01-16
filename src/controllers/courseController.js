// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse : Un contrôleur contient la logique métier tandis qu'une route contient la logique de routage.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour une meilleure organisation du code et une meilleure lisibilité.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const courseData = req.body;

    // Valider les champs obligatoires
    if (!courseData.name || !courseData.description) {
      return res.status(400).json({ error: "Missing required fields: name or description" });
    }

    // Insérer le cours
    const result = await mongoService.insertOne(
      db.getDb().collection("courses"),
      courseData
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getCourse(req, res) {try {
  const courseId = req.params.id;
  const cachedCourse = await redisService.getData(`course:${courseId}`);
  if (cachedCourse) {
    return res.status(200).json(cachedCourse);
  }
  const course = await mongoService.findOneById(
    db.getDb().collection("courses"),
    courseId
  );
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  await redisService.cacheData(`course:${courseId}`, course, 3600); 
  res.status(200).json(course);
} catch (error) {
  console.error("Error getting course:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};
async function getCourseStats(req, res) {
  try {
      const cachedStats = await redisService.getData("courseStats");
      if (cachedStats) {
        return res.status(200).json(cachedStats);
      }
  
      const stats = await db
        .getDb()
        .collection("courses")
        .aggregate([
          {
            $group: {
              _id: null,
              totalCourses: { $sum: 1 },
              averageDuration: { $avg: "$duration" },
              maxDuration: { $max: "$duration" },
              minDuration: { $min: "$duration" },
            },
          },
        ])
        .toArray();
  
      if (stats.length === 0) {
        return res.status(404).json({ error: "No course statistics found" });
      }
  
      await redisService.cacheData("courseStats", stats[0], 3600); // Cache for 1 hour
  
      res.status(200).json(stats[0]);
    } catch (error) {
      console.error("Error getting course stats:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats,
};