# API de Gestion d'Événements

Une API RESTful pour gérer des événements, envoyer des invitations et suivre les réponses des invités.

## Technologies utilisées

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Configuration

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Créez un fichier `.env` à la racine du projet avec les variables suivantes:

```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=eventDB
PORT=3000
```

4. Assurez-vous que PostgreSQL est installé et en cours d'exécution
5. Créez une base de données nommée `eventDB` (ou le nom que vous avez spécifié dans le fichier .env)
6. Démarrez l'application avec `npm start` ou `npm run dev` pour le mode développement

## Structure du projet

```
├── src/
│   ├── config/          # Configuration (base de données)
│   ├── controllers/     # Contrôleurs de l'API
│   ├── middleware/      # Middlewares (validation, etc.)
│   ├── models/          # Modèles Sequelize
│   ├── routes/          # Routes de l'API
│   └── server.js        # Point d'entrée de l'application
├── .env.example         # Exemple de variables d'environnement
├── package.json         # Dépendances et scripts
└── README.md            # Documentation
```

## Routes de l'API

### Événements

- `POST /events` - Créer un nouvel événement
- `GET /events` - Récupérer tous les événements avec leurs invités
- `GET /events/:id` - Récupérer un événement spécifique avec ses invités

### Invités

- `POST /invitees` - Ajouter un invité à un événement
- `PUT /invitees/:id` - Mettre à jour la réponse d'un invité

## Exemples de requêtes

### Créer un événement

```
POST /events
Content-Type: application/json

{
  "title": "Concert de Jazz",
  "description": "Un concert de jazz pour fêter l'été.",
  "date": "2025-06-15T20:00:00Z",
  "location": "Salle de concert de Paris"
}
```

### Ajouter un invité

```
POST /invitees
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "response": "maybe",
  "eventId": 1
}
```

### Mettre à jour la réponse d'un invité

```
PUT /invitees/1
Content-Type: application/json

{
  "response": "yes"
}
```

## Tests

Vous pouvez utiliser Postman ou un outil similaire pour tester les routes de l'API. Une collection Postman exemple sera bientôt disponible.

## Auteur

Gedeon AMOUSSOU
