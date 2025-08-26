import SendMoney from "@/Pages/User/SendMoney";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "MY PROFILE",
    items: [
      {
        title: "Send Money",
        url: "transactions", 
        component: SendMoney,
      },
    ],
  },
];
