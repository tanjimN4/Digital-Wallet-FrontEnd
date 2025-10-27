import Users from "@/Pages/Admin/Users";
import CashIn from "@/Pages/Agent/CashIn";
import Profile from "@/Pages/User/Profile";
import SendMoney from "@/Pages/User/SendMoney";
import Transactions from "@/Pages/User/Transactions";
import TransactionsAll from "@/Pages/Admin/TransactionsAll";
import WithdrawMoney from "@/Pages/User/WithdrawMoney";
import type { ISidebarItem, IUser } from "@/types";

export const getSidebarItems = (user?: IUser): ISidebarItem[] => {
  if (!user) return [];

  const sidebar: ISidebarItem[] = [
    {
      title: "Wallet",
      items: [
        { title: "Send Money", url: "/user/transaction/send-money", component: SendMoney },
        { title: "Withdraw Money", url: "/user/transaction/withdraw", component: WithdrawMoney },
        { title: "Transaction History", url: "/user/transaction/history", component: Transactions },
      ],
    },
    {
      title: "Profile",
      items: [
        { title: "Profile Settings", url: "/user/profile", component: Profile },
      ],
    },
  ];

  // Only add Agent section if the user is an approved agent
  if (user.role === "AGENT" && user.agentApprovalStatus === "APPROVED") {
    sidebar.splice(1, 0, {
      title: "Agent",
      items: [
        { title: "Cash In", url: "/user/cashIn", component: CashIn },
        // { title: "Cash Out", url: "/user/cashOut", component: CashOut },
      ],
    });
  }
  if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
    sidebar.push({
      title: "Dashboard",
      items: [
        { title: "Users", url: "/admin/users", component: Users },
        { title: "Transection", url: "/admin/Transection", component: TransactionsAll},
      ],
    });
  }

  return sidebar;
};
