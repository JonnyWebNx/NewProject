import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/global.scss'

// Import Routes
import Layout from "./Layout/Layout.tsx";
import HomeRoute from "./Routes/HomeRoute/HomeRoute.tsx";
import { SignUpRoute } from "./Routes/SignUpRoute/SignUpRoute.tsx";
import SignInRoute from "./Routes/SignInRoute.tsx/SignInRoute.tsx";
import AuthLayout from "./Layout/AuthLayout.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeRoute />
      },
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signUp",
        element: <SignUpRoute />
      },
      {
        path: "signIn",
        element: <SignInRoute />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
