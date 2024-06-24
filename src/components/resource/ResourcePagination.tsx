"use client"
import React from 'react'
import { Button } from '../ui/button'
import useQueryParams from '@/hooks/useQueryParams'

const ResourcePagination = ({ page, pageCount }: { page: number, pageCount: number }) => {
    const { setQueryParams } = useQueryParams()

    const handlePrevious = () => {
        setQueryParams({ page: page - 1 })
    }


    const handleNext = () => {
        setQueryParams({ page: page + 1 })
    }

    return (
        <div className='flex items-center justify-center gap-4 flex-wrap py-5'>
            <Button variant={"outline"} disabled={page == 1} onClick={handlePrevious}>Previous</Button>
            <Button variant={"outline"} disabled={page >= pageCount} onClick={handleNext}>Next</Button>
        </div>
    )
}

export { ResourcePagination }