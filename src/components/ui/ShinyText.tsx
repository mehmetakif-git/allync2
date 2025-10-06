import React from 'react';
import { cn } from '../../utils/cn';

interface ShinyTextProps {
  text: string;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className }) => {
  return (
    <p
      className={cn(
        'animate-shine bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-[length:200%_auto] bg-clip-text text-transparent',
        className
      )}
    >
      {text}
    </p>
  );
};
