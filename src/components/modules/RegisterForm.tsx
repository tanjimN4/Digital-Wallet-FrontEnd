import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import type { IRegister } from "@/types/auth.type";
import type { ZodError } from "@/types/zod.error";
import { useForm, type SubmitHandler } from "react-hook-form";
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

const RegisterForm = () => {
    const form = useForm<IRegister>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const [register] = useRegisterMutation();
    const onSubmit: SubmitHandler<IRegister> = async (data) => {
        try {
            const userInfo = {
                name: data.name,
                email: data.email,
                password: data.password,
            };
            const res = await register(userInfo).unwrap();
            console.log("User registered:", res);
        } catch (err) {
            const error = err as ZodError;
            if (error?.data?.err?.issues) {
                error.data.err.issues.forEach((issue) => {
                    const fieldName = issue.path[0]; // e.g., "password"
                    const message = issue.message;
                    form.setError(fieldName as keyof IRegister, {
                        type: "manual",
                        message,
                    });
                });
            } else if (error?.data?.message) {
                // General backend message
                alert(error.data.message);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
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

                {/* Email */}
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

                {/* Password */}
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

                <Button className="w-full" type="submit">
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
