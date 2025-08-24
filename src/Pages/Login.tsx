import Logo from "@/assets/icons/Logo";
import LoginFrom from "@/components/modules/LoginFrom";
import { Link } from "react-router";

const Login = () => {

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            {/* Card */}
            <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg border border-border">
                {/* Logo */}
                <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                        <Logo />
                    </div>
                    <h1 className="mt-3 text-2xl font-bold text-foreground tracking-widest animate-pulse">
                        𝓕𝓲𝓼𝓽 𝓟𝓪𝔂
                    </h1>
                    <p className="text-sm text-muted-foreground bg-gradient-to-r from-gray-500 via-indigo-300 to-purple-500 bg-clip-text text-transparent animate-[shine_3s_linear_infinite]">
                        Login to your account
                    </p>
                </div>

                {/* Form */}
                <LoginFrom/>
                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-border"></div>
                    <span className="mx-4 text-muted-foreground">or</span>
                    <div className="flex-1 border-t border-border"></div>
                </div>

                {/* Register */}
                <p className="text-center text-sm text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-primary font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );                                                                                                  
};

export default Login;
