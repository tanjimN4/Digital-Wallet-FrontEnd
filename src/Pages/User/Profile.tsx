

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useResetPasswordMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import {
  useMyTransactionQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/user.api";
import { ArrowUpCircle, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

export default function Profile() {
  const [resetPass] = useResetPasswordMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: userData, isLoading, refetch } = useUserInfoQuery(undefined);
  const { data: transactionsData } = useMyTransactionQuery(undefined);

  if (isLoading) {
    return <p className="text-center p-6">Loading dashboard...</p>;
  }

  const user = userData?.data;
  const transactions = transactionsData?.data || [];
  const walletBalance = user?.wallet?.balance || 0;

  const chartData =
    transactions.map((t: any) => ({
      month: new Date(t.createdAt || t.date).toLocaleString("default", {
        month: "short",
      }),
      amount: t.amount,
    })) || [];

  const pieData = [
    {
      name: "Deposit",
      value: transactions.filter(
        (t: any) => t.type.toLowerCase() === "deposit"
      ).length,
    },
    {
      name: "Withdraw",
      value: transactions.filter(
        (t: any) => t.type.toLowerCase() === "withdraw"
      ).length,
    },
    {
      name: "Send",
      value: transactions.filter(
        (t: any) => t.type.toLowerCase() === "send_money"
      ).length,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangeName = async () => {
    if (!newName || !user?._id) return;
    const res = await updateUser({
      id: user._id,
      updateData: { name: newName },
    });
    refetch();
    if ("data" in res && res.data?.success) {
      toast.success("Name updated successfully");
    } else {
      toast.error("Failed to update name");
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!oldPassword || !newPassword) return;
      console.log(oldPassword, newPassword);

      const res = await resetPass({
        resetData: { oldPassword, newPassword },
        id: ""
      });
      console.log(res);
      if (res?.data?.success) {
        toast.success(res.data.message || "Password updated successfully");
      } else {
        toast.error(res?.data?.message || "Failed to update password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Profile Info + Wallet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-4xl">
        {/* Profile */}
        <Card className="">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <CardTitle>My Profile</CardTitle>
              <div className="flex flex-wrap gap-2 ">
                {/* Change Name */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Change Name
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Change Name</AlertDialogTitle>
                      <AlertDialogDescription>
                        Enter your new name below.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="New Name"
                        className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleChangeName}>
                        Save
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Change Password */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Change Password</AlertDialogTitle>
                      <AlertDialogDescription>
                        Enter your current and new password.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-4 space-y-2">
                      <input
                        type="password"
                        placeholder="Old Password"
                        className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleChangePassword}>
                        Save
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm sm:text-base">
            <p>
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user?.role}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={
                  user?.isBlocked === "ACTIVE"
                    ? "text-emerald-600"
                    : "text-red-600"
                }
              >
                {user?.isBlocked}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Wallet */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              ${walletBalance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/user/transaction/withdraw" className="w-full">
          <Button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600">
            <ArrowUpCircle size={18} /> Withdraw
          </Button>
        </Link>

        <Link to="/user/transaction/send-money" className="w-full">
          <Button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600">
            <Send size={18} /> Send Money
          </Button>
        </Link>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-4xl">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Transaction Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="70%"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <ul className="divide-y text-sm">
            {transactions?.map((tx: any) => (
              <li
                key={tx._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-2"
              >
                <span className="capitalize">{tx.type}</span>
                <span
                  className={`font-medium ${tx.type === "deposit"
                    ? "text-emerald-600"
                    : tx.type === "withdraw"
                      ? "text-red-600"
                      : "text-blue-600"
                    }`}
                >
                  {tx.type === "withdraw" ? "-" : "+"}${tx.amount}
                </span>
                <span className="text-gray-600">
                  {new Date(tx.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
