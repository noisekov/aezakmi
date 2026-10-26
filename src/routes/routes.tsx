import { createBrowserRouter } from "react-router";
import Page from "../components/Page/Page";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

export const router = createBrowserRouter(
  [
    {
      element: <Page />,
      children: [
        {
          element: <GuestRoute />,
          children: [
            {
              path: "/",
              lazy: async () => {
                const { default: Login } = await import("../pages/Login/Login");

                return {
                  Component: Login,
                };
              },
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/cards",
              lazy: async () => {
                const { default: Cards } = await import("../pages/Cards/Cards");

                return {
                  Component: Cards,
                };
              },
            },
          ],
        },
      ],
    },
  ],
  // {
  //   basename: "/aezakmi",
  // },
);
