import React from 'react'
import { Table } from '../ui/table'
import { ColumnDef, Table as TableType } from '@tanstack/react-table'
import { CustomTableHeader } from './CustomTableHeader'
import { CustomTableBody } from './CustomTableBody'

interface Props<T> {
    table: TableType<T>,
    onRowClick?: (d: T) => any
}

export function CustomTable<T>({ table, onRowClick }: Props<T>) {
    return (
        <div className='rounded-md border'>
            <Table>
                <CustomTableHeader headerGroups={table.getHeaderGroups()} />
                <CustomTableBody table={table} onRowClick={onRowClick} />
            </Table>
        </div>)
}