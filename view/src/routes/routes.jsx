import { Routes, Route } from 'react-router-dom';
import { LabScheduleComponent, LoginSignForm, LabSelection, HomePage } from '../pages';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/login"
        element={<LoginSignForm />}
        handle={{
          title: "login",
          breadcrumbTitle: "Login"
        }}
      />
      <Route
        path="/laboratorios"
        element={<LabSelection />}
        handle={{
          title: "Laboratórios",
          breadcrumbTitle: "Lista de Laboratórios"
        }}
      />
      <Route
        path="/laboratorios/:labId"
        element={<LabScheduleComponent />}
        handle={{
          title: "Agendamento",
          breadcrumbTitle: "Agendar Horário"
        }}
      />
    </Routes>
  );
}