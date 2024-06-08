import { getMyResources } from "@/actions/resource"
import { MyResourcesList } from "@/components/dashboard/my-resources"
import { unstable_noStore } from "next/cache"

unstable_noStore()

const MyResourcesPage = async () => {


    const resources = await getMyResources()

    return (
        <div>
            <MyResourcesList data={resources} />
        </div>
    )
}

export default MyResourcesPage