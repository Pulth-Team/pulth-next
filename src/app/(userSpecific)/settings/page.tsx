import Link from "next/link";
// import { useSession } from "@/lib/auth-client";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import LogoutButton from "@/app/ui/logoutButton";
import {Button} from "@/components/ui/button";
import {Metadata} from "next";
import {unauthorized} from "next/navigation";

export const metadata: Metadata = {
    title: "Settings - Pulth",
    description: "Manage your account settings and preferences on Pulth. Access early features and customize your learning experience.",
};

export default async function Settings() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        unauthorized();
    }

    return (
        <div className="container max-w-screen-lg mx-auto px-4 sm:px-20">

            <h1 className={"mt-24 text-3xl font-bold"}>Settings</h1>
            <p>You can change </p>

        </div>
    );
}
