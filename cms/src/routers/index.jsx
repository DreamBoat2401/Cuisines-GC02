import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import BaseLayout from "../views/BaseLayout";
import AddCuisine from "../views/AddCuisine";
import AddUser from "../views/AddUser";
import Category from "../views/Category";
import EditPage from "../views/EditPage";
import UploadImage from "../views/UploadImage";

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
        {
          path: "/categories",
          element: <Category base_url={base_url} />,
        },
        {
          path: "/add-cuisine",
          element: <AddCuisine base_url={base_url} />,
        },
        {
          path: "/add-user",
          element: <AddUser base_url={base_url} />,
        },
        {
          path: "/edit/:id",
          element: <EditPage base_url={base_url} />,
        },
        {
          path: "/upload-image/:id",
          element: <UploadImage base_url={base_url} />,
        },
      ]
    },
  ]);

  export default router