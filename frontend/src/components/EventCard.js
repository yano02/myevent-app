import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const EventCard = ({ event }) => {
  const formattedDate = format(new Date(event.date), 'PPP à HH:mm', { locale: fr });
  
  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p className="date">{formattedDate}</p>
      <p className="location">{event.location}</p>
      {event.description && (
        <p className="description">{event.description}</p>
      )}
      <div className="invitees-summary">
        <p>{event.invitees?.length || 0} invités</p>
      </div>
      <Link to={`/events/${event.id}`} className="view-button">
        Voir les détails
      </Link>
    </div>
  );
};

export default EventCard; 