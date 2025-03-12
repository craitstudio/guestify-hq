
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QrCode, Download, ArrowRight, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import LoadingDots from '../ui/LoadingDots';

interface Ticket {
  id: string;
  guestId: string;
  guestName: string;
  ticketNumber: string;
  ticketType: string;
  eventDate: string;
  status: 'valid' | 'used' | 'expired';
}

interface TicketGeneratorProps {
  ticket: Ticket;
  onClose: () => void;
  className?: string;
}

const TicketGenerator = ({ ticket, onClose, className }: TicketGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerateQR = () => {
    setIsGenerating(true);
    
    // Simulate QR code generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast.success("QR Code generated", {
        description: "QR Code has been generated successfully",
      });
    }, 1500);
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    
    // Simulate PDF download
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("PDF downloaded", {
        description: "Ticket PDF has been downloaded successfully",
      });
    }, 1500);
  };

  return (
    <div className={cn("glass-card rounded-xl p-6 animate-scale-in", className)}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6">
          <h3 className="text-lg font-medium">{ticket.guestName}'s Ticket</h3>
          <p className="text-sm text-muted-foreground mt-1">#{ticket.ticketNumber}</p>
        </div>

        {isGenerated ? (
          // Display a mock QR code when generated
          <div className="w-56 h-56 bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-center">
            <QrCode className="w-full h-full text-foreground" />
          </div>
        ) : (
          <div className="w-56 h-56 border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-6">
            {isGenerating ? (
              <div className="text-center">
                <LoadingDots className="mx-auto text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Generating QR code...</p>
              </div>
            ) : (
              <div className="text-center p-4">
                <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Click generate to create a QR code for this ticket</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 w-full max-w-xs">
          {!isGenerated ? (
            <Button 
              className="w-full"
              onClick={handleGenerateQR}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>Generating <LoadingDots className="ml-2" /></>
              ) : (
                <>Generate QR Code <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          ) : (
            <>
              <Button 
                className="w-full"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>Downloading <LoadingDots className="ml-2" /></>
                ) : (
                  <>Download PDF <Download className="ml-2 h-4 w-4" /></>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onClose}
              >
                <Check className="mr-2 h-4 w-4" /> Done
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketGenerator;
