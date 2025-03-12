
import React, { useState, useEffect } from 'react';
import Container from '@/components/layout/Container';
import GuestTable from '@/components/guests/GuestTable';
import GuestForm from '@/components/guests/GuestForm';
import { Button } from "@/components/ui/button";
import { UserPlus, Users, TicketIcon, UserCheck, Clock, ShieldAlert } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from "@/components/ui/card";
import StatCard from '@/components/dashboard/StatCard';

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

// Ticket price data
const ticketPrices = {
  'VIP': 250,
  'Standard': 100,
  'Early Bird': 85,
  'Group': 75
};

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

  // Calculate stats
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.status === 'confirmed').length;
  const pendingGuests = guests.filter(guest => guest.status === 'pending').length;
  
  const calculateTotalRevenue = () => {
    return guests.reduce((total, guest) => {
      if (guest.status !== 'cancelled') {
        return total + (ticketPrices[guest.ticketType as keyof typeof ticketPrices] || 0);
      }
      return total;
    }, 0);
  };

  return (
    <Container>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Guest Management</h1>
            <p className="text-muted-foreground mt-2">Manage guest information, tickets, and registration status</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            title="Total Guests" 
            value={totalGuests} 
            icon={Users} 
            loading={loading}
          />
          <StatCard 
            title="Confirmed" 
            value={confirmedGuests} 
            icon={UserCheck}
            trend="up" 
            loading={loading}
          />
          <StatCard 
            title="Pending" 
            value={pendingGuests} 
            icon={Clock} 
            loading={loading}
          />
          <StatCard 
            title="Total Revenue" 
            value={`$${calculateTotalRevenue().toLocaleString()}`} 
            icon={TicketIcon}
            trend="up" 
            loading={loading}
          />
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
            ticketPrices={ticketPrices}
          />
        </div>
      </div>
    </Container>
  );
};

export default Guests;
