import { getResourceById } from '@/actions/resource'
import React from 'react'
import EditResourceForm from './EditResourceForm'

const EditMyResourcePage = async ({ params: { id } }: { params: { id: string } }) => {

    const resource = await getResourceById(id)

    if (!resource) {
        return null
    }

    return (
        <EditResourceForm resource={resource} />
    )
}

export default EditMyResourcePage