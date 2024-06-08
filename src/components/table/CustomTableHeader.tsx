import { HeaderGroup, flexRender } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "../ui/table"

export function CustomTableHeader<T>({ headerGroups }: { headerGroups: HeaderGroup<T>[] }) {
    return (
        <TableHeader>
            {
                headerGroups.map(headerGp => (
                    <TableRow key={headerGp.id}>
                        {
                            headerGp.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                            )

                        }
                    </TableRow>
                ))
            }
        </TableHeader>
    )
}