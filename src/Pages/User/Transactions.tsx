
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMyTransactionQuery } from "@/redux/features/auth/user.api";
import { useNavigate } from "react-router";
import { useState, useMemo } from "react";

const Transactions = () => {
  const { data, isLoading } = useMyTransactionQuery(undefined);
  const navigate = useNavigate();
  console.log(data);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const rowsPerPage = 5;
  const transactions = data?.data || [];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx: any) => {
      const txDate = new Date(tx.createdAt || tx.date);
      const typeMatch =
        filterType === "ALL" || tx.type.toLowerCase() === filterType.toLowerCase();
      const startMatch = startDate ? txDate >= new Date(startDate) : true;
      const endMatch = endDate ? txDate <= new Date(endDate) : true;
      return typeMatch && startMatch && endMatch;
    });
  }, [transactions, filterType, startDate, endDate]);

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  if (isLoading) {
    return <p className="text-center p-6">Loading transactions...</p>;
  }

  return (
    <div className=" space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Transaction History</h1>
        <Button
          onClick={() => navigate("/user/transaction/history")}
          className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
        >
          See All
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center p-4 rounded-lg border">
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-background text-foreground border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-auto"
        >
          <option value="ALL">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="send_money">Send Money</option>
        </select>

        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto"
          />
          <span className="hidden sm:flex items-center text-gray-500">to</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto"
          />
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setFilterType("ALL");
            setStartDate("");
            setEndDate("");
            setCurrentPage(1);
          }}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
          <thead className="">
            <tr>
              <th className="border px-3 sm:px-4 py-2 text-left">Date</th>
              <th className="border px-3 sm:px-4 py-2 text-left">Type</th>
              <th className="border px-3 sm:px-4 py-2 text-right">Amount</th>
              <th className="border px-3 sm:px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx: any) => (
                <tr key={tx._id} className="hover:bg-gray-50">
                  <td className="border px-3 sm:px-4 py-2 whitespace-nowrap">
                    {new Date(tx.createdAt || tx.date).toLocaleDateString()}
                  </td>
                  <td className="border px-3 sm:px-4 py-2 capitalize whitespace-nowrap">
                    {tx.type.replace("_", " ")}
                  </td>
                  <td
                    className={`border px-3 sm:px-4 py-2 text-right font-medium whitespace-nowrap ${
                      tx.type.toLowerCase() === "withdraw"
                        ? "text-red-600"
                        : tx.type.toLowerCase() === "deposit"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {tx.type.toLowerCase() === "withdraw" ? "-" : "+"}${tx.amount}
                  </td>
                  <td className="border px-3 sm:px-4 py-2">{tx.status || "Success"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Transactions;
