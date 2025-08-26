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
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/',
                Component: HomePage,
            },
            {
                path: '/about',
                Component: About,
            },
            {
                path: '/features',
                Component: Features,
            },
            {
                path: '/contact',
                Component: Contact,
            },
            {
                path: '/faq',
                Component: Faq,
            }
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        children: [
            {
                index: true,
                element: <Navigate to="/admin/users" />,
            },
            ...generateRoutes(adminSidebarItems),
        ],
    },
    {
        path: "/user",
        Component: withAuth(DashboardLayout, role.user as TRole),
        children: [
            {
                index: true,
                element: <Navigate to="/user/profile" />,
            },
            ...generateRoutes(userSidebarItems)],
    },
    {
        path: "/agent",
        Component: withAuth(DashboardLayout, role.agent as TRole),
        children: [
            {
                index: true,
                element: <Navigate to="transaction/send-money" />,
            },
            ...generateRoutes(agentSidebarItems),
        ],
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    }
])