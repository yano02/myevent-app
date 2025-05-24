const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { validateEventCreation } = require('../middleware/validators');

// Route pour créer un événement
router.post('/', validateEventCreation, eventController.createEvent);

// Route pour récupérer tous les événements avec leurs invités
router.get('/', eventController.getAllEvents);

// Route pour récupérer un événement spécifique avec ses invités
router.get('/:id', eventController.getEventById);

module.exports = router; 