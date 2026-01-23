

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { RiAddBoxLine, RiBankCardLine, RiCalendar2Line, RiCalendarLine, RiCoupon2Line, RiDashboard2Line, RiHome2Fill, RiLogoutBoxLine, RiMenu2Line, RiMenu3Line, RiSettings2Line, RiShoppingBag3Line, RiStore2Line } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";



const menuItems = [
    {
        lable: "main",
        component: [
            {
                title: "Order",
                url: "#",
                icon: RiShoppingBag3Line,
            },
            {
                title: "Payment",
                url: "#",
                icon: RiBankCardLine,
            },
        ]
    },
    {
        lable: "Product",
        component: [
            {
                title: "Create Product",
                url: "/dashboard/product",
                icon: RiAddBoxLine,
            },
            {
                title: "Get all Product",
                url: "#",
                icon: RiStore2Line,
            },
        ]
    },
    {
        lable: "Events",
        component: [
            {
                title: "Create Event",
                url: "#",
                icon: RiCalendarLine,
            },
            {
                title: "Get all Event",
                url: "#",
                icon: RiCalendar2Line,
            },
        ]
    },
    {
        lable: "controller",
        component: [
            {
                title: "Index",
                url: "#",
                icon: RiHome2Fill,
            },
            {
                title: "Settings",
                url: "#",
                icon: RiSettings2Line,
            },
        ]
    },
    {
        lable: "Extra",
        component: [
            {
                title: "Discount",
                url: "/dashboard/discount",
                icon: RiCoupon2Line,
            },
        ]
    },
]

// const items = [
//     {
//         title: "Home",
//         url: "#",
//         icon: RiHome2Fill,
//     },
//     {
//         title: "Order",
//         url: "#",
//         icon: RiInbox2Fill,
//     },
//     {
//         title: "Payment",
//         url: "#",
//         icon: RiCalendar2Fill,
//     },
//     {
//         title: "Search",
//         url: "#",
//         icon: RiSearch2Fill,
//     },
//     {
//         title: "Settings",
//         url: "#",
//         icon: RiSettings2Fill,
//     },
// ]

interface DashboardSidebarProps {
    name?: string,
    address?: string
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ name = "abcd", address = "adsfasdf" }) => {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader className="flex flex-row items-center justify-between gap-2">
                <div>
                    <h3 className="text-xl group-data-[collapsible=icon]:hidden">{name}</h3>
                    <h5 className="text-xs group-data-[collapsible=icon]:hidden">{address}</h5>
                </div>
                <SidebarToggle />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarGroup>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={'/'} activeProps={{ className: "bg-muted" }}>
                                    <RiDashboard2Line />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarGroup>

                </SidebarMenu>

                {menuItems.map((item) => {
                    return (
                        <SidebarGroup>
                            <SidebarGroupLabel>{item?.lable}</SidebarGroupLabel>
                            <SidebarMenu>
                                {item.component.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url} activeProps={{ className: "bg-muted" }}>
                                                <item.icon />
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    )
                })}
            </SidebarContent>
            <SidebarFooter className="flex flex-row items-center gap-2 cursor-pointer">
                <RiLogoutBoxLine /><span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarFooter>
        </Sidebar>
    )
}

function SidebarToggle() {
    const { toggleSidebar, open } = useSidebar();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute top-4 right-4 group-data-[collapsible=icon]:mb-10" // Position the button in the sidebar
        >
            {open ? <RiMenu2Line className="h-4 w-4" /> : <RiMenu3Line className="h-4 w-4" />}
        </Button>
    );
}
