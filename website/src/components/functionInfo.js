import React from 'react';
import Chip from './chip.js';

export default function FunctionInfo({ children, version, only, requires, provides }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      {version && <Chip>{version}</Chip>}
      {only && <Chip color="primary">only: {only}</Chip>}
      {requires && <Chip color="danger">requires: {requires}</Chip>}
      {provides && <Chip color="success">provides: {provides}</Chip>}
      {children}
    </div>
  );
}
