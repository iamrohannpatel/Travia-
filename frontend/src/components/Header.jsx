import React from 'react';
import { CircleUserRound, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full px-8 md:px-12 py-5 flex items-center justify-between relative">
      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200/60 to-transparent" />

      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-primary to-amber-400 flex items-center justify-center shadow-md shadow-orange-200">
          <Globe className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <span className="font-bold text-[1.35rem] tracking-tight text-brand-dark">
          Wander<span className="text-brand-primary">Stack</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-8 text-[14px] font-medium">
        <a href="#" className="text-brand-dark font-semibold relative group">
          Discover
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary rounded-full" />
        </a>
        <a href="#" className="text-brand-mute hover:text-brand-dark transition-colors duration-200">Trips</a>
        <a href="#" className="text-brand-mute hover:text-brand-dark transition-colors duration-200">Wallet</a>
      </nav>

      {/* Profile */}
      <div className="flex items-center space-x-3">
        <button className="flex items-center gap-2 text-sm font-semibold text-brand-dark bg-orange-50 hover:bg-orange-100 border border-orange-100 transition-all duration-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md">
          <CircleUserRound strokeWidth={1.5} className="w-5 h-5 text-brand-primary" />
          <span className="hidden sm:inline">Sign in</span>
        </button>
      </div>
    </header>
  );
}
