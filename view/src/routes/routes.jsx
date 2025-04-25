// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import { LabSelection, LoginSign } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSign />,
  },
  {
    path: "/laboratorios",
    element: <LabSelection />,
  },
  // Adicione mais rotas conforme necessário
]);

export default router;