import { useState, useMemo } from "react";
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
import { useSendMoneyMutation, useUserEmailRoleQuery } from "@/redux/features/auth/user.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SendMoneyForm = {
  email: string;
  amount: number;
};

const SendMoney = () => {
  const [searchTerm, setSearchTerm] = useState(""); // state for search

  const form = useForm<SendMoneyForm>({
    defaultValues: {
      email: "",
      amount: 0,
    },
  });

  const { data: emailRoleData, isLoading: isEmailRoleLoading } = useUserEmailRoleQuery();
  
  // Filter only users with role USER
  const onlyUsers = emailRoleData?.data?.filter(
    (user: { role: string }) => user.role === "USER"
  ) || [];

  // Filter users by search term
  const filteredUsers = useMemo(() => {
    return onlyUsers.filter((user: { email: string }) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, onlyUsers]);

  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const onSubmit = async (data: SendMoneyForm) => {
    const payload = {
      email: data.email,
      balance: Number(data.amount),
    };

    try {
      await sendMoney(payload).unwrap();
      toast.success("Money sent successfully!");
      form.reset();
    } catch (err: any) {
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

          {/* 🔍 Search Input */}
          <div className="mb-4">
            <Input
              placeholder="Search user by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Show filtered users */}
          {!isEmailRoleLoading && (
            <ul className="border rounded-lg p-3 max-h-40 overflow-y-auto text-sm space-y-1">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: { email: string }, idx: number) => (
                  <li
                    key={idx}
                    className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                    onClick={() => form.setValue("email", user.email)}
                  >
                    {user.email}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No users found</li>
              )}
            </ul>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
