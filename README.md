# Projet de fin de module NoSQL

## Description
Ce projet est une application de gestion de cours en ligne. Il utilise Node.js, Express, MongoDB et Redis pour fournir une API RESTful.


## Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB
- Redis

## Installation et lancement du projet


-> Cloner le dépôt par les commandes suivantes:

```git clone https://github.com/KH1511/learning-platform-nosql.git```
```cd learning-platform-nosql```

-> Installation des dépendances par la commande :
`npm install`

-> Configuration les variables d'environnement dans le fichier .env:

```MONGODB_URI=mongodb://localhost:27017```
```MONGODB_DB_NAME=learning_platform```
```REDIS_URI=redis://127.0.0.1:6379```
```PORT=3000```

## Structure du Projet
```
├── src
│   ├── config

│   │   ├── db.js                ### connexion aux bases de données

│   │   ├── env.js               ### Validation des variables d'environnement

│   ├── controllers

│   │   ├── courseController.js  ### Contrôleur pour les fonctions qui ont relation avec le cours (creation...)

│   ├── routes

│   │   ├── courseRoutes.js      ### Routes pour les fonctions des cours

│   ├── services

│   │   ├── mongoService.js      ### Pour les services de MongoDB

│   │   ├── redisService.js      ### Pour les services de Redis

│   ├── app.js                   ### Point d'entrée de l'application (pour executer l'application)

├── .env                         ### Fichier de configuration des variables d'environnement

├── .gitignore                   ### Fichier pour ignorer des fichiers et des dossiers particuliers

├── [package-lock.json]          ### Fichier généré automatiquement par npm, contient les versions exactes des dépendances

├── [package.json]               ### Contient les dépendances et scripts du projet

└── [README.md]                  ### Documentation du projet
```
## Les Choix Techniques 

   "dotenv": "16.4.7"  -> Pour la gestion des variables d'environnement, permettant de stocker les configurations sensibles comme les clés API ou les mots de passe dans des fichiers `.env`, afin de sécuriser l'application.
   
   "express": "4.21.2" -> Framework web minimal et flexible pour Node.js, utilisé pour la création des API RESTful. Il facilite le routage, la gestion des requêtes HTTP et la structuration de l'application serveur.
   
   "mongodb": "6.12.0" -> Pour la gestion des bases de données NoSQL, MongoDB permet de stocker des données sous forme de documents JSON, offrant une flexibilité et une scalabilité importantes pour des applications modernes.
   
   "redis": "4.7.0"    -> Pour la gestion du cache, Redis est un système de gestion de données en mémoire qui permet d'améliorer les performances en stockant temporairement des données fréquemment utilisées et ainsi réduire les appels à la base de données.
   
   Node.js : Environnement de travail, une plateforme côté serveur qui permet d'exécuter du JavaScript en dehors du navigateur. Elle est idéale pour les applications à fort trafic et en temps réel, grâce à son modèle non-bloquant basé sur les événements.

   Et pour tester le fonctionnement de l'application, j'ai utilise l'outil : Postman

   # Lancement et tests 

   ->Lancement de l'application a l'aide de la commande "node ./src/app.js"
   ![Server](/images/LancementServeur.png)
   
   -> Create course : 
   ![Create course](/images/InsertionCours.png)

   -> Get course by id :
   ![Get course by id](/images/"ObtentionCours par ID.png")

   -> Get Stats :
   ![Get Stats](/images/ObtentionStats.png)

   -> Server :
   ![Server Status](/images/DataCachePreuve.png) 
