import { create } from 'zustand'

const initialState = {
  destination: '',
  budget: 5000,
  travelers: 2,
  days: 7,
  vibe: 3,
  viewState: 'input',
  currentTripId: null,
  packages: [],
  itineraryEvents: [],
  selectedPackage: null,
}

export const useAppStore = create((set) => ({
  ...initialState,

  // Setters
  setDestination: (destination) => set({ destination }),
  setBudget: (budget) => set({ budget }),
  setTravelers: (travelers) => set({ travelers }),
  setDays: (days) => set({ days }),
  setVibe: (vibe) => set({ vibe }),
  setViewState: (viewState) => set({ viewState }),
  
  setTripData: (data) => set((state) => ({ 
    ...data,
    // If we're setting trip data, normalize keys if needed
  })),

  setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),

  // Load from Supabase
  loadTrip: (trip) => {
    set({
      destination: trip.destination,
      budget: trip.budget,
      days: trip.days,
      vibe: trip.vibe,
      packages: trip.packages,
      itineraryEvents: trip.itinerary,
      currentTripId: trip.id,
      viewState: 'comparison'
    })
  },

  // Reset
  resetStore: () => {
    // Clear URL
    const url = new URL(window.location);
    url.searchParams.delete('trip');
    window.history.pushState({}, '', url);
    
    set({ ...initialState });
  }
}))
