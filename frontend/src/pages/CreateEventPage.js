import React from 'react';
import { Link } from 'react-router-dom';
import EventForm from '../components/EventForm';

const CreateEventPage = () => {
  return (
    <div className="create-event-page">
      <div className="page-header">
        <div className="header-navigation">
          <Link to="/events" className="back-link">
            ← Retour aux événements
          </Link>
        </div>
        <h1>Créer un nouvel événement</h1>
      </div>
      
      <EventForm />
    </div>
  );
};

export default CreateEventPage; 