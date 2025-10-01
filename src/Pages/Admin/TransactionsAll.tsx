import { useState } from "react";
import { useAllTransactionsQuery } from "@/redux/features/auth/admin.api";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const statusColors: Record<string, string> = {
  APPROVED: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  PENDING: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  FAILED: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
};

const typeColors: Record<string, string> = {
  DEPOSIT: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  WITHDRAW: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  SEND_MONEY: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
  CASH_IN: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  CASH_OUT: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
};

const TransactionsAll = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    type: "",
    search: "",
  });

  const { data: allTransactions, isLoading, error } = useAllTransactionsQuery(filters);

  if (isLoading) return <p className="text-center py-8">Loading transactions...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Failed to load transactions</p>;

  return (
    <Card className="p-4 w-full lg:w-4xl mx-auto">
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value, page: 1 })}
        >
          <SelectTrigger className="w-full sm:w-1/3">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.type}
          onValueChange={(value) => setFilters({ ...filters, type: value, page: 1 })}
        >
          <SelectTrigger className="w-full sm:w-1/3">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DEPOSIT">Deposit</SelectItem>
            <SelectItem value="WITHDRAW">Withdraw</SelectItem>
            <SelectItem value="SEND_MONEY">Send Money</SelectItem>
            <SelectItem value="CASH_IN">Cash In</SelectItem>
            <SelectItem value="CASH_OUT">Cash Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-2 py-2 text-left text-sm font-medium">Type</th>
              <th className="px-2 py-2 text-left text-sm font-medium">Amount</th>
              <th className="px-2 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-2 py-2 text-left text-sm font-medium hidden sm:table-cell">Wallet ID</th>
              <th className="px-2 py-2 text-left text-sm font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {allTransactions?.data?.map((txn: any) => (
              <tr key={txn._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${typeColors[txn.type]}`}>
                    {txn.type.replace("_", " ")}
                  </span>
                </td>
                <td>${txn.amount}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[txn.status]}`}>
                    {txn.status}
                  </span>
                </td>
                <td className="hidden sm:table-cell">{txn.toWallet?.ownerId || txn.initiatedBy}</td>
                <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2 sm:gap-0">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          disabled={filters.page === 1}
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
        >
          Previous
        </Button>
        <span className="text-center sm:text-base">Page {filters.page}</span>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default TransactionsAll;
