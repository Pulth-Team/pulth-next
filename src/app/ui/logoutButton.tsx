"use client"
import {signOut} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import posthog from "posthog-js";

function LogoutButton() {

    const router = useRouter();
    return <form method="POST">
        <Button variant={"outline"} type="submit" onClick={async () => {
            await signOut();
            posthog.reset();
            router.push("/");
        }}>
            Logout
        </Button>
    </form>

}

export default LogoutButton;