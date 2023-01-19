import React from 'react';

import ReactDOM from 'react-dom/client';
import { ImageFinderContextProvider } from './context/ImageFinderContext.jsx';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImageFinderContextProvider>
      <App />
    </ImageFinderContextProvider>
  </React.StrictMode>
);
