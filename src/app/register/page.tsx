import {RegisterForm} from "@/app/register/registerForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Register | Pulth",
    description: "Create a Pulth account to access exclusive features and content. Join our community now!",
    keywords: "register, sign up, pulth, account, access, community",
    applicationName: "Pulth.com",
};

export default function Register() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm/>
            </div>
        </div>
    )
}