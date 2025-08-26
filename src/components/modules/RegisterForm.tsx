import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import type { IRegister } from "@/types/auth.type";
import type { ZodError } from "@/types/zod.error";
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
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const RegisterForm = () => {
    const form = useForm<IRegister>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "USER",
        },
    });
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IRegister> = async (data) => {
        try {
            const userInfo = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role, // include role
            };
            const res = await register(userInfo).unwrap();
            console.log(res);

            toast.success("User created successfully");
            navigate("/");
        } catch (err) {
            const error = err as ZodError;
            if (error?.data?.err?.issues) {
                error.data.err.issues.forEach((issue) => {
                    const fieldName = issue.path[0];
                    const message = issue.message;
                    form.setError(fieldName as keyof IRegister, {
                        type: "manual",
                        message,
                    });
                });
            } else if (error?.data?.message) {
                console.error(error.data.message);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@email.com" {...field} />
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
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value || "user"} // <-- default is "user"
                                >
                                    <SelectTrigger className="w-full border rounded-md px-3 py-2">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USER">User</SelectItem>
                                        <SelectItem value="AGENT">Agent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
