import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCashOutMutation, useUserEmailRoleQuery } from "@/redux/features/auth/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const withdrawSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  email: z.string().email("Invalid email address"),
});

type WithdrawFormData = z.infer<typeof withdrawSchema>;

const WithdrawMoney = () => {
  const [searchTerm, setSearchTerm] = useState(""); // for filtering agent email

  const { data: emailRoleData, isLoading: isEmailRoleLoading } = useUserEmailRoleQuery();

  // filter only AGENT role users
  console.log(emailRoleData);
  
  const onlyAgents = emailRoleData?.data?.filter(
    (user: { role: string ,agentApprovalStatus:string}) => user.role === "AGENT" && user.agentApprovalStatus === "APPROVED"
  ) || [];

  // search filter
  const filteredAgents = useMemo(() => {
    return onlyAgents.filter((user: { email: string }) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, onlyAgents]);

  const [cashOut, { isLoading }] = useCashOutMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
  });

  const onSubmit = async (data: WithdrawFormData) => {
    // check if email exists in agent list
    const agentExists = onlyAgents.some((agent: { email: string; }) => agent.email === data.email);
    if (!agentExists) {
      toast.error("This agent does not exist!");
      return;
    }

    try {
      await cashOut(data as any).unwrap();
      toast.success(`$${data.amount} Cash out successfully!`);
      setValue("amount", 0);
      setValue("email", "");
      setSearchTerm("");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Withdraw failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Cash Out</h1>

      {/* Search Agent */}
      <Input
        placeholder="Search agent email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Show agent list */}
      {!isEmailRoleLoading && (
        <ul className="border rounded-md p-2 max-h-40 overflow-y-auto text-sm space-y-1">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent:any, idx:number) => (
              <li
                key={idx}
                className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => {
                  setValue("email", agent.email);
                  setSearchTerm(agent.email); // fill search input
                }}
              >
                {agent.email}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No agents found</li>
          )}
        </ul>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="number"
          placeholder="Amount"
          min={0}
          {...register("amount", {
            valueAsNumber: true,
          })}
        />
        {errors.amount && <p className="text-red-600 text-sm">{errors.amount.message}</p>}

        {/* Read-only email input */}
        <Input
          type="email"
          placeholder="Selected Agent Email"
          readOnly
          {...register("email")}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Withdraw"}
        </Button>
      </form>
    </div>
  );
};

export default WithdrawMoney;
