import {
    RiShoppingBagLine,
    RiTimeLine,
    RiCheckDoubleLine,
    RiUserLine,
    RiNotificationLine,
    RiLogoutBoxLine,
    RiSettings4Line,
    RiHeartLine,
    RiCoupon3Line,
    RiQuestionLine,
    RiCustomerService2Line,
    RiArrowRightSLine,
} from "@remixicon/react";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
    // Mock data - replace with actual user data
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
        avatar: "", // Add avatar URL if available
    };

    const stats = {
        totalOrders: 24,
        processingOrders: 3,
        completedOrders: 21,
    };

    const navigationLinks = [
        { icon: RiUserLine, label: "My Profile", href: "/profile" },
        { icon: RiShoppingBagLine, label: "My Orders", href: "/orders" },
        { icon: RiHeartLine, label: "Wishlist", href: "/wishlist" },
        { icon: RiNotificationLine, label: "Notifications", href: "/notifications" },
        { icon: RiSettings4Line, label: "Settings", href: "/settings" },
        { icon: RiLogoutBoxLine, label: "Logout", href: "/logout", danger: true },
    ];

    const quickLinks = [
        { icon: RiCoupon3Line, label: "Coupons", href: "/coupons" },
        { icon: RiQuestionLine, label: "FAQs", href: "/faqs" },
        { icon: RiCustomerService2Line, label: "Support", href: "/support" },
    ];

    return (
        <div className="container mx-auto p-6 space-y-8">
            {/* 1. Heading Section */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Welcome back, {user.name}! 👋
                </h1>
                <p className="text-muted-foreground text-lg">
                    Manage your orders, profile, and preferences all in one place
                </p>
            </div>

            {/* 2. Order Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Orders Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-2">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-blue-500/10">
                            <RiShoppingBagLine size={32} className="text-blue-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Orders
                            </p>
                            <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
                        </div>
                    </div>
                </Card>

                {/* Processing Orders Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-2">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-amber-500/10">
                            <RiTimeLine size={32} className="text-amber-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">
                                Processing Orders
                            </p>
                            <p className="text-3xl font-bold mt-1">{stats.processingOrders}</p>
                        </div>
                    </div>
                </Card>

                {/* Completed Orders Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-2">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-green-500/10">
                            <RiCheckDoubleLine size={32} className="text-green-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">
                                Completed Orders
                            </p>
                            <p className="text-3xl font-bold mt-1">{stats.completedOrders}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 3. Information and Links Section (3:4:3 ratio) */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                {/* Navigation Links Card (3 columns) */}
                <Card className="lg:col-span-3 p-6">
                    <h2 className="text-xl font-semibold mb-4">Navigation</h2>
                    <nav className="space-y-1">
                        {navigationLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                        link.danger
                                            ? "hover:bg-destructive/10 text-destructive"
                                            : "hover:bg-accent",
                                    )}
                                >
                                    <Icon size={20} />
                                    <span className="flex-1 font-medium">{link.label}</span>
                                    <RiArrowRightSLine
                                        size={18}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </a>
                            );
                        })}
                    </nav>
                </Card>

                {/* User Information Card (4 columns) */}
                <Card className="lg:col-span-4 p-6">
                    <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                    <div className="space-y-6">
                        {/* Avatar and Name */}
                        <div className="flex items-center gap-4 pb-6 border-b">
                            <Avatar className="h-20 w-20 ring-4 ring-primary/10">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60">
                                    {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-2xl font-bold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">Customer</p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                    Email Address
                                </p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                    Phone Number
                                </p>
                                <p className="font-medium">{user.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                    Address
                                </p>
                                <p className="font-medium">{user.address}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quick Links Card (3 columns) */}
                <Card className="lg:col-span-3 p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <div className="space-y-3">
                        {quickLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-accent transition-all duration-200 group"
                                >
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <Icon size={20} className="text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium group-hover:text-primary transition-colors">
                                            {link.label}
                                        </p>
                                    </div>
                                    <RiArrowRightSLine
                                        size={18}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
