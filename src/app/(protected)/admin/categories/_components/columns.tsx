"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { type Category } from "@prisma/client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id" },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const id = row.getValue("id")?.toString();
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a href={`/admin/categories/${id}`}>{row.getValue("name")}</a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Children Categories</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
