
import React, { useState, useEffect } from 'react';
import Container from '@/components/layout/Container';
import GuestTable from '@/components/guests/GuestTable';
import GuestForm from '@/components/guests/GuestForm';
import { Button } from "@/components/ui/button";
import { UserPlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Mock initial guest data
const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    ticketType: 'VIP',
    status: 'confirmed'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    ticketType: 'Standard',
    status: 'confirmed'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 456-7890',
    ticketType: 'Early Bird',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 789-0123',
    ticketType: 'Group',
    status: 'cancelled'
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '+1 (555) 321-0987',
    ticketType: 'VIP',
    status: 'confirmed'
  }
];

const Guests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>(undefined);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setGuests(mockGuests);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleAddGuest = (data: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...data,
      id: uuidv4()
    };
    setGuests(prevGuests => [...prevGuests, newGuest]);
  };

  const handleEditGuest = (data: Guest) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === data.id ? data : guest
      )
    );
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingGuest(undefined);
  };

  const handleSubmit = (data: Omit<Guest, 'id'> & { id?: string }) => {
    if (data.id) {
      handleEditGuest(data as Guest);
    } else {
      handleAddGuest(data);
    }
  };

  return (
    <Container>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Guest Management</h1>
            <p className="text-muted-foreground mt-2">Manage guest information and registrations</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {showForm && (
            <GuestForm
              guest={editingGuest}
              onClose={handleCloseForm}
              onSubmit={handleSubmit}
            />
          )}
          
          <GuestTable
            guests={guests}
            onEdit={handleEdit}
            onDelete={handleDeleteGuest}
            loading={loading}
          />
        </div>
      </div>
    </Container>
  );
};

export default Guests;
