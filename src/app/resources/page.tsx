import { getResourcesForReader } from '@/actions/resource'
import { ResourceCard } from '@/components/resource'
import React from 'react'




const ResourcesPage = async ({ searchParams: { page, search } }: { searchParams: { page: number, search?: string } }) => {
    const resources = await getResourcesForReader({ page, search }) || []

    return (
        <div className='py-10 flex flex-wrap justify-between items-center'>
            {
                resources.map(re =>
                    <ResourceCard resource={re as any} key={re.id} />
                )
            }
        </div>
    )
}

export default ResourcesPage