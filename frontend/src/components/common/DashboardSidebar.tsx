

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
} from "@/components/ui/sidebar";
import { RiCalendar2Fill, RiDashboard2Fill, RiHome2Fill, RiInbox2Fill, RiSearch2Fill, RiSettings2Fill } from "@remixicon/react";
import { Link } from "@tanstack/react-router";

// main => order, payment
// product => create, get all prodcut
// events=> create , get all events
// controller => index, settings

const menuItems = [
    {
        lable: "main",
        component: [
            {
                title: "Order",
                url: "#",
                icon: RiHome2Fill,
            },
            {
                title: "Payment",
                url: "#",
                icon: RiHome2Fill,
            },
        ]
    },
    {
        lable: "Product",
        component: [
            {
                title: "Create Product",
                url: "#",
                icon: RiHome2Fill,
            },
            {
                title: "Get all Product",
                url: "#",
                icon: RiHome2Fill,
            },
        ]
    },
    {
        lable: "Events",
        component: [
            {
                title: "Create Event",
                url: "#",
                icon: RiHome2Fill,
            },
            {
                title: "Get all Event",
                url: "#",
                icon: RiHome2Fill,
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
                icon: RiHome2Fill,
            },
        ]
    },
    {
        lable: "Extra",
        component: [
            {
                title: "Discount",
                url: "#",
                icon: RiHome2Fill,
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
        <Sidebar>
            <SidebarHeader>
                <h3 className="text-xl">{name}</h3>
                <h5 className="text-xs">{address}</h5>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={'/'} activeProps={{ className: "bg-muted" }}>
                                <RiDashboard2Fill />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

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
            <SidebarFooter >
                Logout
            </SidebarFooter>
        </Sidebar>
    )
}