import { create } from 'zustand';
import { getEvents, getEventById, createEvent } from '../api/eventApi';

const useEventStore = create((set, get) => ({
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
  
  // Récupérer tous les événements
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const events = await getEvents();
      set({ events, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Récupérer un événement par ID
  fetchEventById: async (id) => {
    set({ loading: true, error: null });
    try {
      const event = await getEventById(id);
      set({ currentEvent: event, loading: false });
      return event;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  
  // Créer un nouvel événement
  createNewEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const newEvent = await createEvent(eventData);
      set(state => ({ 
        events: [...state.events, newEvent],
        currentEvent: newEvent,
        loading: false 
      }));
      return newEvent;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  
  // Mettre à jour l'événement courant
  setCurrentEvent: (event) => set({ currentEvent: event }),
  
  // Réinitialiser les erreurs
  resetError: () => set({ error: null })
}));

export default useEventStore; 