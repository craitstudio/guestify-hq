
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Users, Ticket, QrCode, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary">Guestify</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary bg-primary bg-opacity-10"
                    : "text-foreground hover:text-primary hover:bg-primary hover:bg-opacity-5"
                )
              }
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              to="/guests"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary bg-primary bg-opacity-10"
                    : "text-foreground hover:text-primary hover:bg-primary hover:bg-opacity-5"
                )
              }
            >
              <Users className="mr-2 h-4 w-4" />
              Guests
            </NavLink>
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary bg-primary bg-opacity-10"
                    : "text-foreground hover:text-primary hover:bg-primary hover:bg-opacity-5"
                )
              }
            >
              <Ticket className="mr-2 h-4 w-4" />
              Tickets
            </NavLink>
            <NavLink
              to="/qrcode"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary bg-primary bg-opacity-10"
                    : "text-foreground hover:text-primary hover:bg-primary hover:bg-opacity-5"
                )
              }
            >
              <QrCode className="mr-2 h-4 w-4" />
              QR Codes
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
