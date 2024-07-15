// src/app/components/StyledButton.tsx

import React from 'react';

interface StyledButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-block px-4 py-2 font-medium group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
      <span className="relative text-black group-hover:text-white">{children}</span>
    </button>
  );
};

export default StyledButton;
