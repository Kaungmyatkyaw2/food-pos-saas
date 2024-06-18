import { getAllResources, getAllResourcesCount } from "@/actions/resource"
import { AllresourcesList } from "@/components/dashboard/admin"
import { Resource } from "@/db/schema"
import { unstable_noStore } from "next/cache"

unstable_noStore()

const AdminPage = async ({ searchParams }: { searchParams: { page?: number, status?: "all" | "pending" | "approved" | "declined" } }) => {

    const page = searchParams.page || 1
    const status = searchParams.status || "all"

    const resources: Resource[] = await getAllResources({ page, status })
    const pageCount: number = await getAllResourcesCount()

    return (
        <div>
            <AllresourcesList pageCount={pageCount} data={resources} />
        </div>
    )
}

export default AdminPage