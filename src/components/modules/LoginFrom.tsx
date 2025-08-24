import { useLoginMutation } from "@/redux/features/auth/auth.api";
import type { ILogin } from "@/types/auth.type";
import { useForm, type SubmitHandler } from "react-hook-form";
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
    const [login]=useLoginMutation();
    const form = useForm<ILogin>();
    const onSubmit: SubmitHandler<ILogin> = (data) => {
        try {
            const res=login(data).unwrap();
            console.log(res);
        } catch (error) {
            console.log(error);
            
        }
        console.log(data);
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