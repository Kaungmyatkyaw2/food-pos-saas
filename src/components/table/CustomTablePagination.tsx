"use client";
import React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import useQueryParams from "@/hooks/useQueryParams";
import { Table as TableType } from '@tanstack/react-table'
import { Button } from "../ui/button";


function CustomTablePagination<T>({ table }: { table: TableType<T> }) {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageCount = table.getPageCount();
    const { setQueryParams, removeQueryParams } = useQueryParams();

    return (
        <div className="text-neutral-900 bg-neutral-100 px-8 py-3 rounded-lg shadow border border-neutral-200 flex md:flex-row flex-col md:justify-between items-center md:space-y-0 space-y-4">

            <p className="text-sm font-medium">
                Page {currentPage} of {pageCount}
            </p>
            <div className="flex gap-x-4">
                <Button
                    disabled={table.getState().pagination.pageIndex == 0}
                    onClick={() => {
                        removeQueryParams("page");
                        table.setPageIndex(0)
                    }}
                    className="border-gray-300"
                    size="icon"
                    variant={"outline"}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => {
                        if (currentPage - 1 == 1) {
                            removeQueryParams("page")
                        } else {
                            setQueryParams({ page: currentPage - 1 });
                        }
                        table.previousPage()
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className="border-gray-300"
                    size="icon"
                    variant={"outline"}
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => {
                        setQueryParams({ page: currentPage + 1 });
                        table.nextPage()
                    }}
                    disabled={!table.getCanNextPage()}
                    className="border-gray-300"
                    size="icon"
                    variant={"outline"}
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    disabled={table.getState().pagination.pageIndex >= pageCount - 1}
                    onClick={() => {
                        setQueryParams({ page: pageCount });
                        table.setPageIndex(pageCount - 1)
                    }}
                    className="border-gray-300"
                    size="icon"
                    variant={"outline"}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>

        </div>
    );
};

export { CustomTablePagination };
