import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import DetailPage from "../views/DetailPage";

const base_url = "https://h8-phase2-gc.vercel.app"

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage base_url={base_url} />,
    },
    {
      path: "/detail/:id",
      element: <DetailPage base_url={base_url} />,
    },
  ]);

  export default router