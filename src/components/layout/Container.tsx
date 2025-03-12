
import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={cn("pt-24 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl animate-fade-in", className)}>
        {children}
      </main>
    </div>
  );
};

export default Container;
