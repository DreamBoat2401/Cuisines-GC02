import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import BaseLayout from "../views/BaseLayout";

const base_url = "https://h8-phase2-gc.vercel.app"

const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage base_url={base_url} />,
    },
    {
      element: <BaseLayout />,
      children: [
        {
          path: "/",
          element: <HomePage base_url={base_url} />,
        },
      ]
    },
  ]);

  export default router