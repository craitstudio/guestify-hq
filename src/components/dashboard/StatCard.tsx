
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  loading?: boolean;
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className, 
  loading = false 
}: StatCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-6 transition-all duration-300 hover-lift",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className={cn(
            "mt-2 text-3xl font-semibold tracking-tight",
            loading ? "animate-pulse" : ""
          )}>
            {value}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p className={cn(
              "mt-2 text-xs font-medium",
              trend === 'up' ? "text-emerald-500" : 
              trend === 'down' ? "text-rose-500" : 
              "text-muted-foreground"
            )}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} 
              {' '}
              {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'No change'}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary bg-opacity-10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
