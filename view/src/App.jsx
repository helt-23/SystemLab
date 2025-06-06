import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LabDataProvider } from './context/LabDataContext';
import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/authContext';
import AppRoutes from './routes/routes';
import LoadingScreen from './public/LoadingScreen';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;