// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LabScheduleComponent, LoginSignForm, LabSelection } from '../pages';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignForm />} />
      <Route path="/laboratorios" element={<LabSelection />} />
      <Route path="/laboratorios/:labId" element={<LabScheduleComponent />} />
    </Routes>
  );
}