
import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import GuestTable from '@/components/guests/GuestTable';
import GuestForm from '@/components/guests/GuestForm';
import { Button } from "@/components/ui/button";
import { UserPlus, Users, TicketIcon, UserCheck, Clock } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { useAppContext, Guest } from '@/context/AppContext';

const Guests = () => {
  const { guests, loading, addGuest, updateGuest, deleteGuest } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>(undefined);

  const handleAddGuest = (data: Omit<Guest, 'id'>) => {
    addGuest(data);
  };

  const handleEditGuest = (data: Guest) => {
    updateGuest(data);
  };

  const handleDeleteGuest = (id: string) => {
    deleteGuest(id);
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
        return total + guest.pricePaid;
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
          />
        </div>
      </div>
    </Container>
  );
};

export default Guests;
