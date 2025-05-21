# Étape 1 : Image de base
FROM node:18-alpine

# Étape 2 : Répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers de dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du code
COPY . .

# Étape 6 : Exposer le port (le port sur lequel ton backend écoute, ex: 3000)
EXPOSE 3000

# Étape 7 : Démarrer l'application
CMD ["npm", "start"]
