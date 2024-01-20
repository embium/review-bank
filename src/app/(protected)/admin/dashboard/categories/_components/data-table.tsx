"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { CreateCategory } from "./create-category";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initData: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  initData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(initData);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const { mutate: deleteRows } = api.category.deleteCategories.useMutation({
    onSuccess: () => {
      const rows: TData[] = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      setData(data.filter((item) => !rows.includes(item)));
      console.log(data);
      table.resetRowSelection();
    },
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  const deleteSelected = () => {
    const rowIds: { id: string }[] = table
      .getSelectedRowModel()
      .rows.map((row) => {
        return { id: row.getValue("id") };
      });

    deleteRows(rowIds);
  };

  return (
    <>
      <div className="pb-5" hidden={!Object.keys(rowSelection).length}>
        <Button onClick={deleteSelected}>Delete selected</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-5">
        <CreateCategory oldData={data} setData={setData} />
      </div>
    </>
  );
}
