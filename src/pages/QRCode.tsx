import React, { useState, useEffect } from 'react';
import Container from '@/components/layout/Container';
import { QrCode, Search, ScanLine, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import LoadingDots from '@/components/ui/LoadingDots';
import { cn } from '@/lib/utils';

interface ScanResult {
  ticketNumber: string;
  guestName: string;
  ticketType: string;
  status: 'valid' | 'used' | 'expired';
  timestamp: string;
}

const QRCode = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);

  const mockScanResults: ScanResult[] = [
    {
      ticketNumber: 'VIP-001-2023',
      guestName: 'John Doe',
      ticketType: 'VIP',
      status: 'valid',
      timestamp: new Date().toISOString()
    },
    {
      ticketNumber: 'STD-002-2023',
      guestName: 'Jane Smith',
      ticketType: 'Standard',
      status: 'used',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString()
    },
    {
      ticketNumber: 'EB-003-2023',
      guestName: 'Robert Johnson',
      ticketType: 'Early Bird',
      status: 'expired',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString()
    }
  ];

  useEffect(() => {
    setScanResults(mockScanResults);
  }, []);

  const handleScan = () => {
    if (!ticketNumber.trim()) {
      toast.error("Please enter a ticket number", {
        description: "Ticket number is required for validation",
      });
      return;
    }

    setIsScanning(true);

    setTimeout(() => {
      const mockResult: ScanResult = {
        ticketNumber: ticketNumber,
        guestName: "Alex Morgan",
        ticketType: "VIP",
        status: Math.random() > 0.3 ? 'valid' : (Math.random() > 0.5 ? 'used' : 'expired'),
        timestamp: new Date().toISOString()
      };

      setScanResults(prev => [mockResult, ...prev]);
      setCurrentScan(mockResult);
      setIsScanning(false);
      setTicketNumber('');

      if (mockResult.status === 'valid') {
        toast.success("Valid Ticket", {
          description: `${mockResult.guestName}'s ticket is valid`,
        });
      } else if (mockResult.status === 'used') {
        toast.warning("Ticket Already Used", {
          description: `${mockResult.guestName}'s ticket has already been scanned`,
        });
      } else {
        toast.error("Invalid Ticket", {
          description: `${mockResult.guestName}'s ticket has expired`,
        });
      }
    }, 1500);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
           ', ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'valid':
        return {
          icon: CheckCircle,
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-50',
          text: 'Valid ticket'
        };
      case 'used':
        return {
          icon: AlertCircle,
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          text: 'Already scanned'
        };
      case 'expired':
        return {
          icon: XCircle,
          color: 'text-rose-500',
          bgColor: 'bg-rose-50',
          text: 'Expired ticket'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          text: 'Unknown status'
        };
    }
  };

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">QR Code Scanner</h1>
          <p className="text-muted-foreground mt-2">Scan and validate event tickets</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium">Scan Ticket</h3>
                  <p className="text-sm text-muted-foreground mt-1">Enter ticket number or scan QR code</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter ticket number..."
                      value={ticketNumber}
                      onChange={(e) => setTicketNumber(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleScan} disabled={isScanning}>
                      {isScanning ? (
                        <>Scanning <LoadingDots className="ml-2" /></>
                      ) : (
                        <>Verify <Search className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center text-center border-2 border-dashed border-border rounded-lg p-8">
                    <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Position the QR code in the center of the scanner
                    </p>
                    <Button variant="outline" className="mt-2">
                      <ScanLine className="mr-2 h-4 w-4" />
                      Open Scanner
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {currentScan && (
              <Card className={cn(
                "border-l-4 animate-scale-in",
                currentScan.status === 'valid' ? "border-l-emerald-500" :
                currentScan.status === 'used' ? "border-l-amber-500" :
                "border-l-rose-500"
              )}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{currentScan.guestName}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentScan.ticketType} | #{currentScan.ticketNumber}
                      </p>
                    </div>
                    
                    <div className={cn(
                      "p-2 rounded-full",
                      getStatusDetails(currentScan.status).bgColor
                    )}>
                      {React.createElement(getStatusDetails(currentScan.status).icon, {
                        className: cn("h-5 w-5", getStatusDetails(currentScan.status).color)
                      })}
                    </div>
                  </div>
                  
                  <div className={cn(
                    "mt-4 p-3 rounded-lg text-sm",
                    getStatusDetails(currentScan.status).bgColor
                  )}>
                    <p className={getStatusDetails(currentScan.status).color}>
                      {getStatusDetails(currentScan.status).text}
                    </p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    Scanned at {formatTimestamp(currentScan.timestamp)}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium">Recent Scans</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  History of recently scanned tickets
                </p>
              </div>
              
              {scanResults.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {scanResults.map((result, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-4 rounded-lg border-l-4 hover:bg-muted/10 transition-colors",
                        result.status === 'valid' ? "border-l-emerald-500" :
                        result.status === 'used' ? "border-l-amber-500" :
                        "border-l-rose-500"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{result.guestName}</p>
                          <p className="text-sm text-muted-foreground">
                            {result.ticketType} | #{result.ticketNumber}
                          </p>
                        </div>
                        {React.createElement(getStatusDetails(result.status).icon, {
                          className: cn("h-5 w-5", getStatusDetails(result.status).color)
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatTimestamp(result.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No scan history available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default QRCode;
