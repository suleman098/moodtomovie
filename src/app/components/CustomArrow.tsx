// src/app/components/CustomArrow.tsx

import React from 'react';
import StyledButton from './StyledButton';

interface CustomArrowProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomArrow: React.FC<CustomArrowProps> = ({ onClick, children }) => (
  <div onClick={onClick}>
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  </div>
);

export default CustomArrow;
