const { body, param } = require('express-validator');

// Validations pour la création d'un événement
exports.validateEventCreation = [
  body('title')
    .notEmpty().withMessage('Le titre est requis')
    .isString().withMessage('Le titre doit être une chaîne de caractères')
    .isLength({ max: 100 }).withMessage('Le titre ne doit pas dépasser 100 caractères'),
  
  body('description')
    .optional()
    .isString().withMessage('La description doit être une chaîne de caractères'),
  
  body('date')
    .notEmpty().withMessage('La date est requise')
    .isISO8601().withMessage('La date doit être au format ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)')
    .custom(value => {
      const date = new Date(value);
      return date > new Date();
    }).withMessage('La date doit être dans le futur'),
  
  body('location')
    .notEmpty().withMessage('Le lieu est requis')
    .isString().withMessage('Le lieu doit être une chaîne de caractères')
    .isLength({ max: 255 }).withMessage('Le lieu ne doit pas dépasser 255 caractères')
];

// Validations pour l'ajout d'un invité
exports.validateInviteeCreation = [
  body('name')
    .notEmpty().withMessage('Le nom est requis')
    .isString().withMessage('Le nom doit être une chaîne de caractères')
    .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères'),
  
  body('email')
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('Format d\'email invalide'),
  
  body('response')
    .notEmpty().withMessage('La réponse est requise')
    .isIn(['yes', 'no', 'maybe']).withMessage('La réponse doit être "yes", "no" ou "maybe"'),
  
  body('eventId')
    .notEmpty().withMessage('L\'ID de l\'événement est requis')
    .isInt({ min: 1 }).withMessage('L\'ID de l\'événement doit être un entier positif')
];

// Validations pour la mise à jour de la réponse d'un invité
exports.validateResponseUpdate = [
  param('id')
    .notEmpty().withMessage('L\'ID de l\'invité est requis')
    .isInt({ min: 1 }).withMessage('L\'ID de l\'invité doit être un entier positif'),
  
  body('response')
    .notEmpty().withMessage('La réponse est requise')
    .isIn(['yes', 'no', 'maybe']).withMessage('La réponse doit être "yes", "no" ou "maybe"')
]; 