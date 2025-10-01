import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCashInMutation } from "@/redux/features/auth/agent.api";
import { useMyTransactionQuery } from "@/redux/features/auth/user.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ICashInForm {
  email: string;
  balance: number;
}

const CashIn = () => {
  const [cashIn, { isLoading }] = useCashInMutation();
  const { refetch } = useMyTransactionQuery();
  const { register, handleSubmit, reset } = useForm<ICashInForm>();

  const onSubmit = async (data: ICashInForm) => {
    try {
      console.log(data)
      
      await cashIn(data).unwrap();
      toast.success("Money sent to user successfully!");
      reset();
      refetch()
    } catch (err: any) {
      console.log(err);
      
      toast.error(err?.data?.message || "Transaction failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Send Money to User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>User Email</Label>
          <Input
            type="email"
            placeholder="Enter user's email"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            {...register("balance", {
              required: "Amount is required",
              valueAsNumber: true,
              min: { value: 1, message: "Amount must be greater than 0" },
            })}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : "Send Money"}
        </Button>
      </form>
    </div>
  );
};

export default CashIn;
