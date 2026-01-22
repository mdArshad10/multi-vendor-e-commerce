import { RiArrowRightSLine, RiHome2Fill } from "@remixicon/react";
import { Link } from "@tanstack/react-router";


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
        <div className="page-header">
            {/* Breadcrumb Navigation */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                    <ol className="breadcrumb-list">
                        {/* Home Link */}
                        <li className="breadcrumb-item">
                            <Link to="/dashboard" className="breadcrumb-link">
                                <RiHome2Fill size={16} />
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        {/* Breadcrumb Items */}
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;

                            return (
                                <li key={index} className="breadcrumb-item">
                                    <RiArrowRightSLine size={16} className="breadcrumb-separator" />
                                    {item.href && !isLast ? (
                                        <Link to={item.href} className="breadcrumb-link">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="breadcrumb-current">{item.label}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            )}

            {/* Page Title & Actions */}
            <div className="page-header-content">
                <div className="page-title-wrapper">
                    <h1 className="page-title">{title}</h1>
                    {description && <p className="page-description">{description}</p>}
                </div>
                {actions && <div className="page-actions">{actions}</div>}
            </div>
        </div>
    );
};
