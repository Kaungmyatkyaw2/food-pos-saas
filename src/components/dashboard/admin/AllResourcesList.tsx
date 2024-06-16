"use client"
import { updateResourceStatus } from '@/actions/resource';
import { CustomTable, CustomTablePagination } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Resource, User } from '@/db/schema'
import useQueryParams from '@/hooks/useQueryParams';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image';
import React, { useState } from 'react'


export const columns: ColumnDef<Resource>[] = [
    {
        accessorKey: "coverImage",
        header: () => <div className="min-w-[100px]">Cover Image</div>,
        cell: ({ row }) => {

            return <Image className='rounded-lg border shadow-sm' src={row.getValue("coverImage")} alt='cover-image' width={100} height={100} />;
        },
    },
    {
        accessorKey: "title",
        header: () => <div className="w-[200px]">Content</div>,
        cell: ({ row }) => {
            return <div className="space-y-2 w-[200px] truncate overflow-x-hidden">
                <h1 className="truncate font-bold">{row.getValue("title")}</h1>
                <p className="text-xs text-neutral-500 overflow-ellipsis overflow-hidden">{row.original.description}</p>
            </div>;
        },
    },
    {
        accessorKey: "tags",
        header: () => <div className=" min-w-max">Tags</div>,
        cell: ({ row }) => {
            return (
                <div className="font-medium min-w-max">
                    {row.getValue("tags")}
                </div>
            );
        },
    },
    {
        accessorKey: "author",
        header: () => <div className="text-center min-w-max">Author</div>,
        cell: ({ row }) => {

            const author: User = row.getValue("author")

            return (
                <h1 className='text-center'>{author?.name}</h1>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="min-w-max">Status</div>,
        cell: ({ row }) => {
            const status: string = row.getValue("status");

            let style = "border border-yellow-500 text-yellow-600 uppercase"

            if (status == "approved") {
                style = "border border-green-500 text-green-600 uppercase"
            } else if (status == "declined") {
                "border border-red-500 text-red-600 uppercase"
            }

            const handleChangeStatus = (e: "approved" | "declined" | "pending") => {
                updateResourceStatus(row.original.id, e)
            }


            return (
                <div className="font-medium min-w-max">
                    <Select value={status} onValueChange={handleChangeStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="declined">Decliend</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="min-w-max">Created At</div>,
        cell: ({ row }) => {
            const date: Date = new Date(row.getValue("createdAt"));
            const formattedCreatedAt = new Intl.DateTimeFormat("en-Us").format(date);

            return (
                <div className="font-medium min-w-max">{formattedCreatedAt}</div>
            );
        },
    },

];

const AllresourcesList = ({ data, pageCount }: { data: Resource[], pageCount: number }) => {

    const { urlSearchParams } = useQueryParams();
    const queryPage = urlSearchParams.get("page")
    const isPageOne = !urlSearchParams.get("page") || queryPage == "1"
    const [pagination, setPagination] = useState({ pageIndex: isPageOne ? 0 : +(queryPage || 1) - 1, pageSize: 10 })


    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true,
        state: {
            pagination
        },
        pageCount

    })


    return (
        <div className='space-y-6'>
            <CustomTable<Resource> table={table} />
            <CustomTablePagination<Resource> table={table} />
        </div>
    )
}

export { AllresourcesList }