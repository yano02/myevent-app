import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import useEventStore from '../store/eventStore';
import LoadingSpinner from '../components/LoadingSpinner';
import InviteeList from '../components/InviteeList';
import InviteeForm from '../components/InviteeForm';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentEvent, loading, error, fetchEventById } = useEventStore();
  const [invitees, setInvitees] = useState([]);
  
  useEffect(() => {
    const loadEventDetails = async () => {
      const event = await fetchEventById(parseInt(id, 10));
      if (event) {
        setInvitees(event.invitees || []);
      }
    };
    
    loadEventDetails();
  }, [id, fetchEventById]);
  
  const handleInviteeAdded = (newInvitee) => {
    setInvitees(prev => [...prev, newInvitee]);
  };
  
  const handleInviteeUpdated = (updatedInvitee) => {
    setInvitees(prev => 
      prev.map(invitee => 
        invitee.id === updatedInvitee.id ? updatedInvitee : invitee
      )
    );
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">
          Une erreur est survenue: {error}
        </p>
        <button onClick={() => navigate('/events')} className="back-button">
          Retour à la liste
        </button>
      </div>
    );
  }
  
  if (!currentEvent) {
    return (
      <div className="error-container">
        <p className="error-message">
          Événement non trouvé
        </p>
        <button onClick={() => navigate('/events')} className="back-button">
          Retour à la liste
        </button>
      </div>
    );
  }
  
  const formattedDate = format(new Date(currentEvent.date), 'PPP à HH:mm', { locale: fr });
  
  return (
    <div className="event-detail-page">
      <div className="page-header">
        <div className="header-navigation">
          <Link to="/events" className="back-link">
            ← Retour aux événements
          </Link>
        </div>
        <h1>{currentEvent.title}</h1>
      </div>
      
      <div className="event-details">
        <div className="detail-row">
          <span className="label">Date:</span>
          <span className="value">{formattedDate}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Lieu:</span>
          <span className="value">{currentEvent.location}</span>
        </div>
        
        {currentEvent.description && (
          <div className="description-box">
            <h3>Description</h3>
            <p>{currentEvent.description}</p>
          </div>
        )}
      </div>
      
      <div className="invitees-section">
        <InviteeList 
          invitees={invitees} 
          onInviteeUpdated={handleInviteeUpdated}
        />
        
        <InviteeForm 
          eventId={currentEvent.id} 
          onSuccess={handleInviteeAdded}
        />
      </div>
    </div>
  );
};

export default EventDetailPage; 