import { create } from 'zustand';
import { addInvitee, updateInviteeResponse } from '../api/inviteeApi';

const useInviteeStore = create((set, get) => ({
  loading: false,
  error: null,
  
  // Ajouter un invité
  addInvitee: async (inviteeData) => {
    set({ loading: true, error: null });
    try {
      const newInvitee = await addInvitee(inviteeData);
      set({ loading: false });
      return newInvitee;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  
  // Mettre à jour la réponse d'un invité
  updateResponse: async (id, response) => {
    set({ loading: true, error: null });
    try {
      const updatedInvitee = await updateInviteeResponse(id, response);
      set({ loading: false });
      return updatedInvitee;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  
  // Réinitialiser les erreurs
  resetError: () => set({ error: null })
}));

export default useInviteeStore; 