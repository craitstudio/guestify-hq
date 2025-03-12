
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Edit, Trash2, Search, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface GuestTableProps {
  guests: Guest[];
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
  className?: string;
  loading?: boolean;
}

const GuestTable = ({ guests, onEdit, onDelete, className, loading = false }: GuestTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.phone.includes(searchQuery)
  );

  const handleDelete = (id: string, name: string) => {
    toast.success(`Guest "${name}" has been removed`, {
      description: "Guest information deleted successfully",
    });
    onDelete(id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn("glass-card rounded-xl p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Guest List</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ticket Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 6 }).map((_, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-4">
                      <div className="h-6 bg-muted/30 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredGuests.length > 0 ? (
              filteredGuests.map((guest) => (
                <tr 
                  key={guest.id} 
                  className="transition-colors hover:bg-muted/10"
                >
                  <td className="px-4 py-4 text-sm">{guest.name}</td>
                  <td className="px-4 py-4 text-sm">{guest.email}</td>
                  <td className="px-4 py-4 text-sm">{guest.phone}</td>
                  <td className="px-4 py-4 text-sm">{guest.ticketType}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      getStatusColor(guest.status)
                    )}>
                      {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(guest)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:bg-destructive/10" 
                          onClick={() => handleDelete(guest.id, guest.name)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No guests found. Try a different search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestTable;
