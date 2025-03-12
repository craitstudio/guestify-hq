
import React from 'react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingDots from '../ui/LoadingDots';

interface GuestChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  className?: string;
  loading?: boolean;
}

const GuestChart = ({ data, className, loading = false }: GuestChartProps) => {
  return (
    <div className={cn("glass-card rounded-xl p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Guest Attendance</h3>
        {loading && <LoadingDots className="text-muted-foreground" />}
      </div>
      <div className="h-64">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-full h-32 animate-pulse bg-muted/30 rounded-md" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis dataKey="name" className="text-xs text-muted-foreground" />
              <YAxis className="text-xs text-muted-foreground" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                barSize={36}
                className="opacity-80 hover:opacity-100 transition-opacity" 
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default GuestChart;
