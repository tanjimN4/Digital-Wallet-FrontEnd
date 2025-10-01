
import Transactions from "@/Pages/Admin/TransactionsAll";
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
        {
          title: "Transection",
          url: "/admin/transection",
          component:Transactions
        },
      ],
    },
   
  ]