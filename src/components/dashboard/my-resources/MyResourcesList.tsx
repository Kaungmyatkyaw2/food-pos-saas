"use client"
import { CustomTable, CustomTablePagination } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Resource } from '@/db/schema'
import useQueryParams from '@/hooks/useQueryParams';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import ResourceDeleteButton from './ResourceDeleteButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


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
        header: () => <div className="max-w-[180px]">Content</div>,
        cell: ({ row }) => {
            return <div className="space-y-2 w-[180px] truncate overflow-x-hidden">
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
        accessorKey: "status",
        header: () => <div className="min-w-max">Status</div>,
        cell: ({ row }) => {
            const status: string = row.getValue("status");


            let style = {
                text: "text-yellow-600",
                basedPing: "bg-yellow-400",
                ping: "bg-yellow-500"

            }

            if (status == "approved") {
                style.text = " text-green-600"
                style.basedPing = "bg-green-400"
                style.ping = "bg-green-500"

            } else if (status == "declined") {
                style.text = "text-red-600"
                style.basedPing = "bg-red-400"
                style.ping = "bg-red-500"

            }


            return (
                <div className="font-medium min-w-max">
                    <div className={`flex items-center gap-2`}>
                        <span className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.ping}`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${style.basedPing}`}></span>
                        </span>
                        <p className={`${style.text} font-medium uppercase`}>{status}</p>
                    </div>
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
    {
        accessorKey: "actions",
        header: () => <div className="text-right min-w-max">Actions</div>,
        cell: ({ row }) => {

            return (
                <div className="flex justify-end gap-x-2">
                    <Button className='rounded-full border bg-neutral-200' size={"icon"} variant={"secondary"} asChild>
                        <Link href={`/dashboard/my-resources/edit/${row.original.id}`}>
                            <Edit className='w-3 h-3' />
                        </Link>
                    </Button>
                    <ResourceDeleteButton resource={row.original} />
                </div>
            );
        },
    },
];

const MyResourcesList = ({ data, pageCount }: { data: Resource[], pageCount: number }) => {

    const { urlSearchParams, setQueryParams } = useQueryParams();
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
            <div className="font-medium min-w-max">
                <Select value={urlSearchParams.get("status") || "all"} onValueChange={(e) => { setQueryParams({ status: e }) }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="declined">Decliend</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <CustomTable<Resource> table={table} />
            <CustomTablePagination<Resource> table={table} />
        </div>
    )
}

export { MyResourcesList }