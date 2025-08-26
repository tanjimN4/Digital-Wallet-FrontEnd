
import Transactions from "@/Pages/Agent/Transactions";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const UsersData=lazy(() => import("@/Pages/Admin/Users"));

export const adminSidebarItems :ISidebarItem[]=[
    {
      title: "Dashboard",
      items: [
        {
          title: "Users",
          url: "/admin/users",
          component:UsersData
        },
      ],
    },
    {
      title: "Tour Management",
      items: [
        {
          title: "Add Tour Type",
          url: "/admin/add-tour-type",
          component:Transactions
        },
      ],
    },
   
  ]