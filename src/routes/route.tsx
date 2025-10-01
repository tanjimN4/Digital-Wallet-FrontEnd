import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/Pages/About";
import Contact from "@/Pages/Contact";
import Faq from "@/Pages/Faq";
import Features from "@/Pages/Features";
import HomePage from "@/Pages/HomePage";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems"; // function

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { path: '/', Component: HomePage },
      { path: '/about', Component: About },
      { path: '/features', Component: Features },
      { path: '/contact', Component: Contact },
      { path: '/faq', Component: Faq },
    ]
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/users" /> },
      ...generateRoutes(adminSidebarItems), // static
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, [role.user, role.agent, role.admin,role.superAdmin] as TRole[]),
    children: [
      { index: true, element: <Navigate to="/user/profile" /> },
      ...generateRoutes(userSidebarItems), // function passed, will be called inside DashboardLayout
    ],
  },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
]);
