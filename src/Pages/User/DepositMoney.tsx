"use client";

import { Button } from "@/components/ui/button";
import { useDepositMoneyMutation } from "@/redux/features/auth/user.api";
import { useState } from "react";
import { toast } from "sonner";

const DepositMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [depositMoney, { isLoading }] = useDepositMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await depositMoney({ amount }).unwrap(); // ✅ send correct field
      toast.success(`Deposited $${amount} successfully!`);
      setAmount(0);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Deposit failed");
    }
  };

  return (
    <div className="p-6 space-y-4 lg:w-2/4">
      <h1 className="text-2xl font-bold">Deposit Money</h1>
      <p className="text-gray-600">Deposit money to your wallet</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? "Depositing..." : "Deposit"}
        </Button>
      </form>
    </div>
  );
};

export default DepositMoney;
