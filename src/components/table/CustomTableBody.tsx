import React from 'react'

import { ColumnDef, Table, flexRender } from '@tanstack/react-table'
import { TableBody, TableCell, TableRow } from '../ui/table'


interface Props<T> {
    table: Table<T>,
    onRowClick?: (d: T) => any
}

export function CustomTableBody<T>({ table, onRowClick }: Props<T>) {
    return (
        <TableBody>
            {table?.getRowModel()?.rows?.length ? (
                <>
                    {
                        table.getRowModel()?.rows.map((row) => (
                            <TableRow
                                className='cursor-pointer'
                                onClick={() => { onRowClick?.(row.original) }}
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    }

                </>
            ) : (
                <TableRow>
                    <TableCell
                        colSpan={table.getAllColumns()?.length}
                        className="h-24 text-center"
                    >
                        No results.
                    </TableCell>
                </TableRow>
            )}


        </TableBody>
    )
}