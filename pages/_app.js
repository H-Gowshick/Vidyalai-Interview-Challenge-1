import React from 'react';
import { WindowWidthProvider } from '../components/hooks/WindowWidthContext';

const App = ({ Component, pageProps }) => (
  // WindowWidthProvider context to the entire application
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;
