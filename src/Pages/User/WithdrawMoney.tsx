
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCashOutMutation } from "@/redux/features/auth/user.api";
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
        try {
            await cashOut(data).unwrap();
            toast.success(`$${data.amount} Cash out successfully!`);
            setValue("amount", 0);
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Withdraw failed");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Cash Out</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    type="number"
                    placeholder="Amount"
                    min={0}
                    {...register("amount", {
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: "Amount must be greater than 0",
                        },
                        required: "Amount is required",
                    })}
                />

                {errors.amount && <p className="text-red-600 text-sm">{errors.amount.message}</p>}

                <Input
                    type="email"
                    placeholder="Agent Email"
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