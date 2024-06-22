import { getResourcesForReader } from '@/actions/resource'
import { ResourceCard } from '@/components/resource'
import Image from 'next/image'
import React from 'react'




const ResourcesPage = async ({ searchParams: { page, search } }: { searchParams: { page: number, search?: string } }) => {
    const resources = await getResourcesForReader({ page, search }) || []


    if (!resources.length) {
        return <div className='space-y-9 h-[calc(100vh-75px)] flex flex-col items-center justify-center'>
            <Image className='mx-auto block' src={"/no-data.svg"} height={300} width={300} alt='graduation-pic' />
            <h1 className='font-bold text-3xl'>No resources found</h1>
        </div>
    }

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