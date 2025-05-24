import api from './axios';

export const addInvitee = async (inviteeData) => {
  try {
    const response = await api.post('/invitees', inviteeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateInviteeResponse = async (id, response) => {
  try {
    const result = await api.put(`/invitees/${id}`, { response });
    return result.data;
  } catch (error) {
    throw error;
  }
}; 