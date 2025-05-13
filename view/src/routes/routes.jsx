// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import { LabSelection, LoginSignForm } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignForm />,
  },
  {
    path: "/laboratorios",
    element: <LabSelection />,
  },
  // Adicionar mais rotas conforme necessário
]);

export default router;