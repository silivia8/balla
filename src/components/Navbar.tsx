import React from 'react';
import { Search, Bell, User, Menu, Home, LayoutGrid } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Navbar() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Vault', path: '/vault' },
  ];

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-10 z-40 bg-gradient-to-b from-black/90 via-black/40 to-transparent absolute top-0 left-0 right-0 pointer-events-none">
      <div className="flex items-center gap-8 pointer-events-auto">
        <NavLink to="/" className="flex items-center gap-2 mr-4">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-bold text-xl tracking-tighter">LUMINA</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 text-sm font-bold tracking-wide",
                  isActive 
                    ? "bg-white text-black shadow-lg" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )
              }
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex-1 max-w-md mx-8 pointer-events-auto hidden lg:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:ring-1 focus:ring-white/20 transition-all outline-none text-white placeholder:text-white/30 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 pointer-events-auto">
        <button className="text-white/40 hover:text-white transition-colors lg:hidden">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-white/40 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]" />
        </button>
        <button className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 p-0.5 group-hover:border-white/30 transition-colors">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" 
              alt="User" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
