
import React, { useState, useEffect } from 'react';
import Container from '@/components/layout/Container';
import StatCard from '@/components/dashboard/StatCard';
import GuestChart from '@/components/dashboard/GuestChart';
import { Users, Ticket, CheckCircle, Clock } from 'lucide-react';

// Mock data for the dashboard
const mockChartData = [
  { name: 'Monday', value: 12 },
  { name: 'Tuesday', value: 19 },
  { name: 'Wednesday', value: 15 },
  { name: 'Thursday', value: 27 },
  { name: 'Friday', value: 32 },
  { name: 'Saturday', value: 42 },
  { name: 'Sunday', value: 35 },
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGuests: 0,
    confirmedGuests: 0,
    pendingGuests: 0,
    issuedTickets: 0
  });

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setStats({
        totalGuests: 164,
        confirmedGuests: 124,
        pendingGuests: 32,
        issuedTickets: 124
      });
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Event overview and guest statistics</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Guests"
            value={loading ? "..." : stats.totalGuests}
            icon={Users}
            loading={loading}
            trend="up"
          />
          <StatCard
            title="Confirmed Guests"
            value={loading ? "..." : stats.confirmedGuests}
            icon={CheckCircle}
            loading={loading}
            trend="up"
          />
          <StatCard
            title="Pending Guests"
            value={loading ? "..." : stats.pendingGuests}
            icon={Clock}
            loading={loading}
            trend="down"
          />
          <StatCard
            title="Tickets Issued"
            value={loading ? "..." : stats.issuedTickets}
            icon={Ticket}
            loading={loading}
            trend="up"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <GuestChart 
            data={mockChartData} 
            loading={loading}
          />
        </div>
      </div>
    </Container>
  );
};

export default Index;
