# Réinterprétation de tâches à accomplir

1. MCD 👍
1. créer la BDD (`createdb oblog`) 👍
1. Sqitch : étape 1 de création 👍

   - `sqitch init oblog --engine pg --top-dir migrations --target db:pg:oblog`
   - `sqitch add create -n "création de la bdd"`
   - dupliquer `sqitch.conf` en `sqitch.example.conf`

1. Configuration environnement de travail 👍 

   - `npm init -y`
   - ajouter `"type": "module",` dans le package.json si on veut utiliser les ESM
   - `eslint --init`
   - `npm i express dotenv pg joi express-jsdoc-swagger`
   - création `.env` et `.env.example`
   - création `.gitignore`

1. Import Ad'hoc des données JSON 👍
1. Création de la structure des dossiers 👍
   - index.js (serveur web)
   - app/
     - index.app.js  (application express)
     - controllers/
     - routers/
     - helpers/
     - middlewares/
     - datamappers/ ou models/ ou /dto
     - views/
     - errors/
1. Création du serveur web et de l'application de base
   - Configuration de l'environnement de développement 👍
   - Routeurs organisés 👍
   - Gestion des erreurs 👍
   - Logs d'erreurs
   - Validation avec Joi
   - Documentation JSDoc
   - Documentation Swagger
