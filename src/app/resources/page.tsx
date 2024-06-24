import { getResourcesCountForReader, getResourcesForReader } from '@/actions/resource'
import { ResourceCard, ResourcePagination } from '@/components/resource'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { Suspense } from 'react'




const ResourcesPage = async ({ searchParams }: { searchParams: { page: number, search?: string } }) => {

    const page = searchParams.page || 1
    const resources = await getResourcesForReader({ page, search: searchParams?.search }) || []
    const pageCount = await getResourcesCountForReader(searchParams.search)


    return (
        <>
            {
                resources.length ?
                    <div className='py-10 flex flex-wrap justify-between items-center'>
                        {
                            resources.map(re =>
                                <ResourceCard resource={re as any} key={re.id} />
                            )
                        }
                    </div>
                    :
                    <div className='space-y-9 pt-20 flex flex-col items-center justify-center'>
                        <Image className='mx-auto block' src={"/no-data.svg"} height={300} width={300} alt='graduation-pic' />
                        <h1 className='font-bold text-3xl'>No resources found</h1>
                    </div>
            }

            {
                !resources.length && page == 1 ?
                    null
                    :
                    <Suspense>
                        <ResourcePagination page={page} pageCount={pageCount} />
                    </Suspense>
            }
        </>
    )
}

export default ResourcesPage