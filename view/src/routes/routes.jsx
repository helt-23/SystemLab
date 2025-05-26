// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import { LabSelection, LoginSignForm, LabScheduleComponent } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignForm />,
  },
  {
    path: "/laboratorios",
    element: <LabSelection />,
  },
  {
    path: "/horarios",
    element: <LabScheduleComponent />,
  }
  // Adicionar mais rotas conforme necessário
]);

export default router;