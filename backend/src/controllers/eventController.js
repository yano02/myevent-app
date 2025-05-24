const { Event, Invitee } = require('../models');
const { validationResult } = require('express-validator');

// Créer un nouvel événement
exports.createEvent = async (req, res) => {
  try {
    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date, location } = req.body;
    
    // Création de l'événement
    const event = await Event.create({
      title,
      description,
      date,
      location
    });

    return res.status(201).json(event);
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return res.status(500).json({ 
      message: 'Erreur serveur lors de la création de l\'événement',
      error: error.message 
    });
  }
};

// Récupérer tous les événements avec leurs invités
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{
        model: Invitee,
        as: 'invitees',
        attributes: ['id', 'name', 'email', 'response']
      }]
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return res.status(500).json({ 
      message: 'Erreur serveur lors de la récupération des événements',
      error: error.message 
    });
  }
};

// Récupérer un événement par son ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByPk(id, {
      include: [{
        model: Invitee,
        as: 'invitees',
        attributes: ['id', 'name', 'email', 'response']
      }]
    });

    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    return res.status(500).json({ 
      message: 'Erreur serveur lors de la récupération de l\'événement',
      error: error.message 
    });
  }
}; 