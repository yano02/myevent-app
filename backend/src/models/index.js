const Event = require('./Event');
const Invitee = require('./Invitee');

// Définition des relations
Event.hasMany(Invitee, { 
  foreignKey: 'eventId',
  as: 'invitees',
  onDelete: 'CASCADE'
});

Invitee.belongsTo(Event, { 
  foreignKey: 'eventId',
  as: 'event'
});

module.exports = {
  Event,
  Invitee
}; 