import React from 'react';

export default function Chip({ children, color }) {
  return (
    <span className={`chip ${color && `chip--${color}`}`}>
      {children}
    </span>
  );
}
