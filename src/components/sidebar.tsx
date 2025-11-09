import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {NavUser} from "@/components/sidebarAuth";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";


const itemList = [
    {
        name: "Explore",
        url: "/articles"
    }, {
        name: "Quizzes",
        url: "/quizzes"
    }, {
        name: "Tags",
        url: "/tags"
    }

]

export function AppSidebar(props: {
    user: {
        id: string
        email: string
        name: string
        image?: string | null | undefined
    } | false
}) {

    return (
        <Sidebar variant={"floating"}>
            <SidebarHeader className={""}>
                hhaeeaderer
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemList.map((item) => (
                                <SidebarMenuItem key={item.url}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            {item.name}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup/>
            </SidebarContent>
            <SidebarFooter>
                {/*{ <NavUser/> : <div>weekslatter</div>}*/}
                {/*<NavUser/>*/}
                {props.user && <NavUser email={props.user.email} name={props.user.name} id={props.user.id}
                                        image={props.user.image || "/default.jpg"}/>}
                {!props.user && <Card className="gap-2 py-4 shadow-none">
                    <CardHeader className="px-4">
                        <CardTitle className="text-sm">Subscribe to our newsletter</CardTitle>
                        <CardDescription>
                            Opt-in to receive updates and news about the sidebar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4">
                        <form>
                            <div className="grid gap-2.5">
                                <SidebarInput type="email" placeholder="Email"/>
                                <Button
                                    className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
                                    size="sm"
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>}

            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}