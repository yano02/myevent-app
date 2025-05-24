const { Invitee, Event } = require('../models');
const { validationResult } = require('express-validator');

// Ajouter un invité à un événement
exports.addInvitee = async (req, res) => {
  try {
    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, response, eventId } = req.body;

    // Vérifier que l'événement existe
    const eventExists = await Event.findByPk(eventId);
    if (!eventExists) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Vérifier si l'invité existe déjà pour cet événement
    const existingInvitee = await Invitee.findOne({
      where: { email, eventId }
    });

    if (existingInvitee) {
      return res.status(400).json({ message: 'Cet invité est déjà ajouté à cet événement' });
    }
    
    // Création de l'invité
    const invitee = await Invitee.create({
      name,
      email,
      response,
      eventId
    });

    return res.status(201).json(invitee);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'invité:', error);
    return res.status(500).json({ 
      message: 'Erreur serveur lors de l\'ajout de l\'invité',
      error: error.message 
    });
  }
};

// Mettre à jour la réponse d'un invité
exports.updateInviteeResponse = async (req, res) => {
  try {
    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { response } = req.body;

    // Vérifier que l'invité existe
    const invitee = await Invitee.findByPk(id);
    if (!invitee) {
      return res.status(404).json({ message: 'Invité non trouvé' });
    }

    // Mise à jour de la réponse
    invitee.response = response;
    await invitee.save();

    return res.status(200).json(invitee);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réponse:', error);
    return res.status(500).json({ 
      message: 'Erreur serveur lors de la mise à jour de la réponse',
      error: error.message 
    });
  }
}; 