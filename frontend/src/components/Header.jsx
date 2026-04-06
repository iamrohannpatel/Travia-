import React from 'react';
import { CircleUserRound } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full px-8 md:px-12 py-6 flex items-center justify-between bg-transparent">
      {/* Logo */}
      <div className="font-bold text-[1.4rem] tracking-tight text-brand-dark">
        WanderStack
      </div>

      {/* Navigation - Centered (Hidden on very small screens) */}
      <nav className="hidden md:flex space-x-8 text-[15px] font-medium">
        <a href="#" className="text-brand-dark border-b-2 border-brand-dark pb-1">Discover</a>
        <a href="#" className="text-slate-400 hover:text-brand-dark transition-colors">Trips</a>
        <a href="#" className="text-slate-400 hover:text-brand-dark transition-colors">Wallet</a>
      </nav>

      {/* Profile/Actions */}
      <div className="flex items-center space-x-4">
        <button className="text-brand-dark hover:text-brand-blue transition-colors rounded-full bg-slate-200/50 p-1">
          <CircleUserRound strokeWidth={1.5} className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
