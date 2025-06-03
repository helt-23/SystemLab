import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LabDataProvider } from './context/LabDataContext';
import { LoadingProvider } from './context/LoadingContext';
import AppRoutes from './routes/routes';
import LoadingScreen from './public/LoadingScreen';

function App() {
  return (
    <LoadingProvider>
      <Router>
        <LabDataProvider>
          <div style={{ position: 'relative' }}>
            <LoadingScreen />
            <AppRoutes />
          </div>
        </LabDataProvider>
      </Router>
    </LoadingProvider>
  );
}

export default App;