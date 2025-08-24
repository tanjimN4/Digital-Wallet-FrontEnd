import App from "@/App";
import About from "@/Pages/About";
import Contact from "@/Pages/Contact";
import Faq from "@/Pages/Faq";
import Features from "@/Pages/Features";
import HomePage from "@/Pages/HomePage";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import { createBrowserRouter } from "react-router";


export const router =createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            {
                path:'/',
                Component:HomePage,
            },
            {
                path:'/about',
                Component:About,
            },
            {
                path:'/features',
                Component:Features,
            },
            {
                path:'/contact',
                Component:Contact,
            },
            {
                path:'/faq',
                Component:Faq,
            }
        ]
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