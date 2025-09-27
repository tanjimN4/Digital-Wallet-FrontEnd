import CashIn from "@/Pages/Agent/CashIn";
import CashOut from "@/Pages/Agent/CashOut";
import DepositMoney from "@/Pages/User/DepositMoney";
import Profile from "@/Pages/User/Profile";
import SendMoney from "@/Pages/User/SendMoney";
import Transactions from "@/Pages/User/Transactions";
import WithdrawMoney from "@/Pages/User/WithdrawMoney";
import type { ISidebarItem, IUser } from "@/types";

export const getSidebarItems = (user?: IUser): ISidebarItem[] => {
  if (!user) return [];

  const sidebar: ISidebarItem[] = [
    {
      title: "Wallet",
      items: [
        { title: "Send Money", url: "/user/transaction/send-money", component: SendMoney },
        { title: "Deposit Money", url: "/user/transaction/deposit", component: DepositMoney },
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
        { title: "Cash Out", url: "/user/cashOut", component: CashOut },
      ],
    });
  }

  return sidebar;
};
