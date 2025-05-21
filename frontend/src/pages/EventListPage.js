import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useEventStore from '../store/eventStore';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const EventListPage = () => {
  const { events, loading, error, fetchEvents } = useEventStore();
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="event-list-page">
      <div className="page-header">
        <h1>Événements</h1>
        <Link to="/events/new" className="create-button">
          Créer un événement
        </Link>
      </div>
      
      {error && (
        <div className="error-container">
          <p className="error-message">
            Une erreur est survenue: {error}
          </p>
          <button onClick={fetchEvents} className="retry-button">
            Réessayer
          </button>
        </div>
      )}
      
      {!loading && events.length === 0 && !error && (
        <div className="empty-state">
          <p>Aucun événement disponible.</p>
          <p>Créez votre premier événement pour commencer.</p>
        </div>
      )}
      
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventListPage; 