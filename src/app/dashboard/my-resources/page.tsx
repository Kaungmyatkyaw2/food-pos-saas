import { getMyResources, getMyResourcesCount } from "@/actions/resource"
import { MyResourcesList } from "@/components/dashboard/my-resources"
import { Resource } from "@/db/schema"
import { unstable_noStore } from "next/cache"

unstable_noStore()

const MyResourcesPage = async ({ searchParams }: { searchParams: { page?: number, status?: "all" | "pending" | "approved" | "declined" } }) => {

    const page = searchParams.page || 1
    const status = searchParams.status || "all"

    const resources: Resource[] = await getMyResources({ page, status })
    const pageCount: number = await getMyResourcesCount()

    return (
        <div>
            <MyResourcesList pageCount={pageCount} data={resources} />
        </div>
    )
}

export default MyResourcesPage