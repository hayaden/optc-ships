import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Ships } from "./ships/ships";
import { ShipDetail } from "./shipDetail/ship-detail";
import { Toaster } from "./ui/toaster";
import { NotFound } from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Ships />
        <Toaster />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "view/:shipId",
        element: <ShipDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default () => <RouterProvider router={router} />;
