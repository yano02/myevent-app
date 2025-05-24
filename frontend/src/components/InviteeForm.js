import React, { useState } from 'react';
import useInviteeStore from '../store/inviteeStore';

const InviteeForm = ({ eventId, onSuccess }) => {
  const { addInvitee, error, resetError } = useInviteeStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    response: 'maybe',
    eventId
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
    
    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis';
    } else if (formData.name.length > 100) {
      errors.name = 'Le nom ne doit pas dépasser 100 caractères';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else {
      // Validation simple d'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newInvitee = await addInvitee(formData);
      if (newInvitee) {
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          response: 'maybe',
          eventId
        });
        
        // Appeler le callback de succès
        if (onSuccess) {
          onSuccess(newInvitee);
        }
      }
    }
  };
  
  return (
    <div className="invitee-form-container">
      <h3>Ajouter un invité</h3>
      <form onSubmit={handleSubmit} className="invitee-form">
        <div className="form-group">
          <label htmlFor="name">Nom *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? 'error' : ''}
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="response">Réponse</label>
          <select
            id="response"
            name="response"
            value={formData.response}
            onChange={handleChange}
          >
            <option value="yes">Participe</option>
            <option value="no">Ne participe pas</option>
            <option value="maybe">Peut-être</option>
          </select>
        </div>
        
        {error && <p className="api-error-message">{error}</p>}
        
        <button type="submit" className="submit-button">Ajouter</button>
      </form>
    </div>
  );
};

export default InviteeForm; 