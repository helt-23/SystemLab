// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LabScheduleComponent, LabSelection, LoginSignForm, ReservationModal } from '../pages';

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LoginSignForm />} />

      <Route path="/laboratorios" element={<LabSelection />} />

      <Route path="/horarios" element={<LabScheduleComponent />} />

    </Routes>
  );
}
