import { useLoginMutation } from "@/redux/features/auth/auth.api";
import type { ILogin } from "@/types/auth.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import { Input } from "../ui/input";

const LoginFrom = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate()
    const form = useForm<ILogin>();
    const onSubmit: SubmitHandler<ILogin> = async (data) => {
        try {
            await login(data).unwrap();
            toast.success("User logged in successfully");
            navigate("/");
        } catch (error) {
            // Fix type to allow error.data access
            const err = error as { data?: { message?: string } };
            if (err?.data?.message === "User is authenticated with Google") {
                toast.error(
                    "This account is registered with Google. Please login using Google."
                );
            } else {
                toast.error(err?.data?.message || "Login failed ❌");
            }
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default LoginFrom;