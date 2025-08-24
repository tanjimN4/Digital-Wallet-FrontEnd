import App from "@/App";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import { createBrowserRouter } from "react-router";


export const router =createBrowserRouter([
    {
        path:'/',
        Component:App,
    },
    {
        path:'/login',
        Component:Login,
    },
    {
        path:'/register',
        Component:Register,
    }
])