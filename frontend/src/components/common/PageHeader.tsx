import { RiHome2Line } from "@remixicon/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";


export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    breadcrumbs?: BreadcrumbItem[];
    description?: string;
    actions?: React.ReactNode;
}

export const PageHeader = ({ title, breadcrumbs, description, actions }: PageHeaderProps) => {
    return (
        <div className="page-header mb-4 space-y-4 border-b border-gray-200 pb-6 dark:border-gray-800">
            {/* Page Title & Actions */}
            <div className="page-header-content flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="page-title-wrapper flex-1 space-y-1">
                    <h1 className="page-title text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{title}</h1>
                    {description && <p className="page-description text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
                {actions && <div className="page-actions flex items-center gap-2">{actions}</div>}
            </div>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            <RiHome2Line size={14} />
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {breadcrumbs?.map((item, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {(index === breadcrumbs.length - 1) ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}

                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
