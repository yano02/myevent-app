import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className={`loading-spinner ${sizeClass}`}>
      <div className="spinner"></div>
      <p>Chargement...</p>
    </div>
  );
};

export default LoadingSpinner; 