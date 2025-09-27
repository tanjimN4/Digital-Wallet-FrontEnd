"use client";

import { Button } from "@/components/ui/button";
import { useMyTransactionQuery } from "@/redux/features/auth/user.api";
import { useNavigate } from "react-router";

const Transactions = () => {
  const { data, isLoading } = useMyTransactionQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="text-center p-6">Loading transactions...</p>;
  }

  const transactions = data?.data || [];

  return (
    <div className="p-6 space-y-4 lg:w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <Button
          onClick={() => navigate("/user/transaction/history")}
          className="bg-blue-500 hover:bg-blue-600"
        >
          See All
        </Button>
      </div>
      <p className="text-sm text-gray-600">
        View your recent transactions with filters and pagination.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="">
            <tr>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-right">Amount</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map((tx: any) => (
              <tr key={tx._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {new Date(tx.createdAt || tx.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 capitalize">{tx.type.replace("_", " ")}</td>
                <td
                  className={`border px-4 py-2 text-right font-medium ${
                    tx.type.toLowerCase() === "withdraw"
                      ? "text-red-600"
                      : tx.type.toLowerCase() === "deposit"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {tx.type.toLowerCase() === "withdraw" ? "-" : "+"}${tx.amount}
                </td>
                <td className="border px-4 py-2">{tx.status || "Success"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
