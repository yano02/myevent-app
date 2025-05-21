import React from 'react';
import useInviteeStore from '../store/inviteeStore';

const InviteeList = ({ invitees, onInviteeUpdated }) => {
  const { updateResponse, loading, error } = useInviteeStore();
  
  const handleResponseChange = async (id, newResponse) => {
    const updatedInvitee = await updateResponse(id, newResponse);
    if (updatedInvitee && onInviteeUpdated) {
      onInviteeUpdated(updatedInvitee);
    }
  };
  
  const getResponseLabel = (response) => {
    switch (response) {
      case 'yes':
        return { text: 'Participe', className: 'response-yes' };
      case 'no':
        return { text: 'Ne participe pas', className: 'response-no' };
      case 'maybe':
        return { text: 'Peut-être', className: 'response-maybe' };
      default:
        return { text: 'Inconnu', className: '' };
    }
  };
  
  if (!invitees || invitees.length === 0) {
    return <p className="no-invitees">Aucun invité pour le moment.</p>;
  }
  
  return (
    <div className="invitee-list-container">
      <h3>Liste des invités ({invitees.length})</h3>
      {error && <p className="error-message">{error}</p>}
      <table className="invitee-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Réponse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitees.map(invitee => {
            const responseInfo = getResponseLabel(invitee.response);
            return (
              <tr key={invitee.id}>
                <td>{invitee.name}</td>
                <td>{invitee.email}</td>
                <td className={responseInfo.className}>{responseInfo.text}</td>
                <td>
                  <select
                    value={invitee.response}
                    onChange={(e) => handleResponseChange(invitee.id, e.target.value)}
                    disabled={loading}
                  >
                    <option value="yes">Participe</option>
                    <option value="no">Ne participe pas</option>
                    <option value="maybe">Peut-être</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InviteeList; 