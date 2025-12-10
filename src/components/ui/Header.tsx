import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-base font-medium text-foreground">Khalifa Fund</h1>
        <p className="text-xs text-muted-foreground">EJP Insight Hub</p>
      </div>
    </div>
  );

  const UserProfile = () => (
    <div className="flex items-center space-x-3">
      <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-muted/50 rounded-lg">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-foreground">Admin User</p>
        </div>
        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={14} className="text-primary-foreground" />
        </div>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur border-b border-border z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Logo />
          
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;