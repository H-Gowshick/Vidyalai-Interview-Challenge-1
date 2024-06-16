import React, { useContext } from 'react';
import { WindowWidthContext } from '../hooks/WindowWidthContext';  // Importing  context

export default function Container({ children }) {
  const { isSmallerDevice } = useContext(WindowWidthContext);  // Using context

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}
