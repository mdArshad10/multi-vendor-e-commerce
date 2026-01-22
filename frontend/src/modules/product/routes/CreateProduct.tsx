import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/common/PageHeader";
import "@/components/common/PageHeader.css";

const CreateProduct = () => {
    return (
        <>
            <DashboardLayout>
                <PageHeader
                    title="Create Product"
                    description="Add a new product to your inventory"
                    breadcrumbs={[
                        { label: "Products", href: "/products" },
                        { label: "Create Product" }
                    ]}
                    actions={
                        <button className="btn-primary">Save Product</button>
                    }
                />

                {/* Your product form goes here */}
                <div>


                </div>
            </DashboardLayout>
        </>
    )
}

export default CreateProduct;