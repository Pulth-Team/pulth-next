import {LoginForm} from "@/app/login/loginForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login | Pulth",
    description: "Login to your Pulth account to access exclusive features and content. Join our community now!",
    keywords: "login, pulth, account, access, community",
    applicationName: "Pulth.com",
};

export default function Login() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm/>
            </div>
        </div>
    );
}