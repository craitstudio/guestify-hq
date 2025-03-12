
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Edit, Trash2, Search, MoreHorizontal, UserCog, TicketIcon, DollarSign, Phone, Mail } from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";

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
  ticketPrices: Record<string, number>;
}

const GuestTable = ({ guests, onEdit, onDelete, className, loading = false, ticketPrices }: GuestTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.phone.includes(searchQuery) ||
    guest.ticketType.toLowerCase().includes(searchQuery.toLowerCase())
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
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTicketPrice = (ticketType: string) => {
    return ticketPrices[ticketType] || 0;
  };

  return (
    <div className={cn("glass-card rounded-xl p-6 shadow-lg", className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <UserCog className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-xl font-semibold">Guest List</h3>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or ticket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-80 border-gray-300"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Guest</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Contact</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center">
                  <TicketIcon className="h-4 w-4 mr-1" />
                  Ticket
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 5 }).map((_, cellIndex) => (
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
                  <td className="px-4 py-4">
                    <div className="font-medium">{guest.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {guest.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {guest.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{guest.ticketType}</span>
                      <span className="text-sm text-muted-foreground flex items-center mt-1">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {getTicketPrice(guest.ticketType)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={cn(
                      "font-normal",
                      getStatusColor(guest.status)
                    )}>
                      {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
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
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No guests found. Try a different search term or add a new guest.
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
