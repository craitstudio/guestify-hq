
import React, { useState, useEffect } from 'react';
import Container from '@/components/layout/Container';
import TicketCard from '@/components/tickets/TicketCard';
import TicketGenerator from '@/components/tickets/TicketGenerator';
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  ChevronDown 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface Ticket {
  id: string;
  guestId: string;
  guestName: string;
  ticketNumber: string;
  ticketType: string;
  eventDate: string;
  status: 'valid' | 'used' | 'expired';
}

// Mock ticket data
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

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleGenerateQR = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowGenerator(true);
  };

  const handleDownloadPDF = (ticket: Ticket) => {
    toast.success("Preparing download", {
      description: `Generating PDF for ${ticket.guestName}'s ticket`,
    });
    setTimeout(() => {
      toast.success("PDF Ready", {
        description: "Ticket PDF has been downloaded successfully",
      });
    }, 1500);
  };

  const handleCloseGenerator = () => {
    setShowGenerator(false);
    setSelectedTicket(null);
  };

  const filteredTickets = tickets.filter(ticket => {
    // Search filter
    const matchesSearch = 
      ticket.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
    
    // Type filter
    const matchesType = typeFilter ? ticket.ticketType === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const clearFilters = () => {
    setStatusFilter(null);
    setTypeFilter(null);
  };

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Ticket Management</h1>
          <p className="text-muted-foreground mt-2">View and manage event tickets</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets or guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Tickets</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    By Status
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setStatusFilter('valid')}>
                    Valid Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('used')}>
                    Used Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('expired')}>
                    Expired Tickets
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    By Type
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setTypeFilter('VIP')}>
                    VIP Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('Standard')}>
                    Standard Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('Early Bird')}>
                    Early Bird Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('Group')}>
                    Group Tickets
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={clearFilters} className="text-primary">
                  Clear All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {(statusFilter || typeFilter) && (
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-2">Active filters:</span>
            {statusFilter && (
              <span className="bg-muted px-2 py-1 rounded-full text-xs mr-2">
                Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </span>
            )}
            {typeFilter && (
              <span className="bg-muted px-2 py-1 rounded-full text-xs mr-2">
                Type: {typeFilter}
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
              Clear all
            </Button>
          </div>
        )}
        
        {showGenerator && selectedTicket && (
          <TicketGenerator 
            ticket={selectedTicket}
            onClose={handleCloseGenerator}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading placeholders
            Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index} 
                className="rounded-xl border border-border h-64 animate-pulse bg-muted/20"
              />
            ))
          ) : filteredTickets.length > 0 ? (
            // Actual tickets
            filteredTickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onGenerateQR={handleGenerateQR}
                onDownload={handleDownloadPDF}
              />
            ))
          ) : (
            // No tickets found
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p>No tickets match your search criteria.</p>
              <Button 
                variant="link" 
                onClick={clearFilters}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Tickets;
