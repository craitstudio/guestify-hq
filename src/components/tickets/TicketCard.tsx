
import React from 'react';
import { cn } from '@/lib/utils';
import { QrCode, Download, Copy, Calendar, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
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

interface TicketCardProps {
  ticket: Ticket;
  onGenerateQR: (ticket: Ticket) => void;
  onDownload: (ticket: Ticket) => void;
  className?: string;
}

const TicketCard = ({ ticket, onGenerateQR, onDownload, className }: TicketCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'border-l-emerald-500 bg-emerald-50';
      case 'used':
        return 'border-l-blue-500 bg-blue-50';
      case 'expired':
        return 'border-l-rose-500 bg-rose-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handleCopyTicketNumber = () => {
    navigator.clipboard.writeText(ticket.ticketNumber);
    toast.success("Ticket number copied", {
      description: "Ticket number has been copied to clipboard",
    });
  };

  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden bg-white shadow-sm border border-border transition-all duration-300 hover-lift",
        "border-l-4",
        getStatusColor(ticket.status),
        className
      )}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{ticket.ticketType} Ticket</p>
            <h3 className="text-lg font-semibold mt-1">{ticket.guestName}</h3>
          </div>
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            ticket.status === 'valid' ? "bg-emerald-100 text-emerald-800" :
            ticket.status === 'used' ? "bg-blue-100 text-blue-800" :
            "bg-rose-100 text-rose-800"
          )}>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex items-center justify-between w-full">
              <span>Ticket #:</span>
              <div className="flex items-center">
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {ticket.ticketNumber}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-6 w-6 ml-1"
                  onClick={handleCopyTicketNumber}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex items-center justify-between w-full">
              <span>Event Date:</span>
              <span>{ticket.eventDate}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onGenerateQR(ticket)}
          >
            <QrCode className="h-4 w-4 mr-2" />
            QR Code
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onDownload(ticket)}
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
