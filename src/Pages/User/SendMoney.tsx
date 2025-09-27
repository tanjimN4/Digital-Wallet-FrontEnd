import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendMoneyMutation } from "@/redux/features/auth/user.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SendMoneyForm = {
  email: string;
  amount: number;
};

const SendMoney = () => {
  const form = useForm<SendMoneyForm>({
    defaultValues: {
      email: "",
      amount: 0,
    },
  });

  const [sendMoney, { isLoading }] = useSendMoneyMutation();

const onSubmit: SubmitHandler<SendMoneyForm> = async (data) => {
  // Convert amount to number before sending
  const payload = {
    email: data.email,
    balance: Number(data.amount),
  };

  console.log("Sending payload:", payload);

  try {
    await sendMoney(payload).unwrap(); 
    toast.success("Money sent successfully!");
    form.reset();
  } catch (err: any) {
    // Show backend error if available
    toast.error(err?.data?.message || "Something went wrong");
    console.log("Error response:", err.data);
  }
};

  return (
    <div className="flex-1 lg:w-5xl flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Send Money</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base">
            Enter the recipient's email and the amount to transfer safely.
          </p>

          {/* Use Form from ShadCN */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Recipient Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} placeholder="Enter amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Money"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoney;
