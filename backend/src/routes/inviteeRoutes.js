const express = require('express');
const router = express.Router();
const inviteeController = require('../controllers/inviteeController');
const { validateInviteeCreation, validateResponseUpdate } = require('../middleware/validators');

// Route pour ajouter un invité à un événement
router.post('/', validateInviteeCreation, inviteeController.addInvitee);

// Route pour mettre à jour la réponse d'un invité
router.put('/:id', validateResponseUpdate, inviteeController.updateInviteeResponse);

module.exports = router; 