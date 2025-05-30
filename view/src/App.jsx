// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LabDataProvider } from './context/LabDataContext';
import AppRoutes from './routes/routes'; // importa o arquivo de rotas

function App() {
  return (
    <Router>
      <LabDataProvider>
        <AppRoutes />
      </LabDataProvider>
    </Router>
  );
}

export default App;
