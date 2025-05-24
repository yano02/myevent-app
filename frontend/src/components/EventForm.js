import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEventStore from '../store/eventStore';

const EventForm = () => {
  const navigate = useNavigate();
  const { createNewEvent, error, resetError } = useEventStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Réinitialiser l'erreur spécifique
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Réinitialiser les erreurs de l'API
    if (error) {
      resetError();
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Le titre est requis';
    } else if (formData.title.length > 100) {
      errors.title = 'Le titre ne doit pas dépasser 100 caractères';
    }
    
    if (!formData.date) {
      errors.date = 'La date est requise';
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate <= now) {
        errors.date = 'La date doit être dans le futur';
      }
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Le lieu est requis';
    } else if (formData.location.length > 255) {
      errors.location = 'Le lieu ne doit pas dépasser 255 caractères';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const eventData = {
        ...formData,
        date: new Date(formData.date).toISOString()
      };
      
      const newEvent = await createNewEvent(eventData);
      if (newEvent) {
        navigate(`/events/${newEvent.id}`);
      }
    }
  };
  
  return (
    <div className="event-form-container">
      <h2>Créer un nouvel événement</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Titre *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={formErrors.title ? 'error' : ''}
          />
          {formErrors.title && <p className="error-message">{formErrors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date et heure *</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={formErrors.date ? 'error' : ''}
          />
          {formErrors.date && <p className="error-message">{formErrors.date}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Lieu *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={formErrors.location ? 'error' : ''}
          />
          {formErrors.location && <p className="error-message">{formErrors.location}</p>}
        </div>
        
        {error && <p className="api-error-message">{error}</p>}
        
        <button type="submit" className="submit-button">Créer l'événement</button>
      </form>
    </div>
  );
};

export default EventForm; 