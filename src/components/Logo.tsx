'use client';

// src/components/Logo.tsx
import React from 'react';
import logo from '../assets/logo.png';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const heights = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
    xl: 'h-28',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logo.src}
        alt="Company logo"
        className={`${heights[size]} w-auto object-contain ${
          variant === 'light' ? 'brightness-0 invert' : ''
        }`}
      />
    </div>
  );
};