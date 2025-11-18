import React, { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import Link from 'next/link';

const Header = ({ isLoggedIn = true, onToggleSidebar }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">SC</span>
              </div>
              <span className="hidden sm:inline bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SmartMonitor
              </span>
            </Link>
          </div>

          {/* Right side - Actions */}
          {isLoggedIn && (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
