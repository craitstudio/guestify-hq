
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  pricePaid: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Ticket {
  id: string;
  guestId: string;
  guestName: string;
  ticketNumber: string;
  ticketType: string;
  eventDate: string;
  status: 'valid' | 'used' | 'expired';
}

// Mock initial data
const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    ticketType: 'VIP',
    pricePaid: 250,
    status: 'confirmed'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    ticketType: 'Standard',
    pricePaid: 100,
    status: 'confirmed'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 456-7890',
    ticketType: 'Early Bird',
    pricePaid: 85,
    status: 'pending'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 789-0123',
    ticketType: 'Group',
    pricePaid: 75,
    status: 'cancelled'
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '+1 (555) 321-0987',
    ticketType: 'VIP',
    pricePaid: 250,
    status: 'confirmed'
  }
];

const mockTickets: Ticket[] = [
  {
    id: '1',
    guestId: '1',
    guestName: 'John Doe',
    ticketNumber: 'VIP-001-2023',
    ticketType: 'VIP',
    eventDate: 'Oct 15, 2023',
    status: 'valid'
  },
  {
    id: '2',
    guestId: '2',
    guestName: 'Jane Smith',
    ticketNumber: 'STD-002-2023',
    ticketType: 'Standard',
    eventDate: 'Oct 15, 2023',
    status: 'used'
  },
  {
    id: '3',
    guestId: '3',
    guestName: 'Robert Johnson',
    ticketNumber: 'EB-003-2023',
    ticketType: 'Early Bird',
    eventDate: 'Oct 15, 2023',
    status: 'valid'
  },
  {
    id: '4',
    guestId: '4',
    guestName: 'Emily Davis',
    ticketNumber: 'GRP-004-2023',
    ticketType: 'Group',
    eventDate: 'Oct 15, 2023',
    status: 'expired'
  },
  {
    id: '5',
    guestId: '5',
    guestName: 'Michael Wilson',
    ticketNumber: 'VIP-005-2023',
    ticketType: 'VIP',
    eventDate: 'Oct 15, 2023',
    status: 'valid'
  },
  {
    id: '6',
    guestId: '6',
    guestName: 'Sarah Thompson',
    ticketNumber: 'STD-006-2023',
    ticketType: 'Standard',
    eventDate: 'Oct 15, 2023',
    status: 'used'
  }
];

// Ticket price data
export const ticketPrices = {
  'VIP': 250,
  'Standard': 100,
  'Early Bird': 85,
  'Group': 75
};

// Context type definition
interface AppContextType {
  guests: Guest[];
  tickets: Ticket[];
  loading: boolean;
  addGuest: (data: Omit<Guest, 'id'>) => void;
  updateGuest: (guest: Guest) => void;
  deleteGuest: (id: string) => void;
  generateTicket: (guestId: string) => void;
  updateTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setGuests(mockGuests);
      setTickets(mockTickets);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const addGuest = (data: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...data,
      id: uuidv4()
    };
    setGuests(prevGuests => [...prevGuests, newGuest]);
    return newGuest;
  };

  const updateGuest = (updatedGuest: Guest) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === updatedGuest.id ? updatedGuest : guest
      )
    );
    
    // Update related tickets if guest name or type changes
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.guestId === updatedGuest.id
          ? {
              ...ticket,
              guestName: updatedGuest.name,
              ticketType: updatedGuest.ticketType
            }
          : ticket
      )
    );
  };

  const deleteGuest = (id: string) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
    // Remove related tickets
    setTickets(prevTickets => prevTickets.filter(ticket => ticket.guestId !== id));
  };

  const generateTicket = (guestId: string) => {
    const guest = guests.find(g => g.id === guestId);
    if (!guest) return;

    const prefix = guest.ticketType === 'VIP' ? 'VIP' : 
                  guest.ticketType === 'Standard' ? 'STD' :
                  guest.ticketType === 'Early Bird' ? 'EB' : 'GRP';
    
    const ticketNumber = `${prefix}-${String(tickets.length + 1).padStart(3, '0')}-${new Date().getFullYear()}`;
    
    const newTicket: Ticket = {
      id: uuidv4(),
      guestId,
      guestName: guest.name,
      ticketNumber,
      ticketType: guest.ticketType,
      eventDate: 'Oct 15, 2023', // This could be dynamic
      status: 'valid'
    };
    
    setTickets(prevTickets => [...prevTickets, newTicket]);
    return newTicket;
  };

  const updateTicket = (updatedTicket: Ticket) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  const deleteTicket = (id: string) => {
    setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== id));
  };

  return (
    <AppContext.Provider value={{
      guests,
      tickets,
      loading,
      addGuest,
      updateGuest,
      deleteGuest,
      generateTicket,
      updateTicket,
      deleteTicket
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
