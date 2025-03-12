
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  className?: string;
}

const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse-light" />
      <div className="w-2 h-2 rounded-full bg-current animate-pulse-light [animation-delay:0.2s]" />
      <div className="w-2 h-2 rounded-full bg-current animate-pulse-light [animation-delay:0.4s]" />
    </div>
  );
};

export default LoadingDots;
