
import DepositMoney from "@/Pages/User/DepositMoney";
import Profile from "@/Pages/User/Profile";
import SendMoney from "@/Pages/User/SendMoney";
import Transactions from "@/Pages/User/Transactions";
import WithdrawMoney from "@/Pages/User/WithdrawMoney";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "Send Money",
        url: "transaction/send-money",
        component: SendMoney,
      },
      {
        title: "Deposit Money",
        url: "transaction/deposit",
        component: DepositMoney,
      },
      {
        title: "Withdraw Money",
        url: "transaction/withdraw",
        component: WithdrawMoney,
      },
      {
        title: "Transaction History",
        url: "transaction/history",
        component: Transactions,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Profile Settings",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
];
