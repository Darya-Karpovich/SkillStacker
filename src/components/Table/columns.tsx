"use client";

import type { UserSkill } from "@/generated";
import { Button, Rating } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

const renderColumnHeader = ({
  column,
  title,
}: {
  column: any;
  title: string;
}) => {
  const isSorted = column.getIsSorted();
  const isSortedAsc = isSorted === "asc";
  const handleSortingClick = () => {
    if (!isSorted || isSortedAsc) {
      column.toggleSorting(isSortedAsc);
    } else {
      column.clearSorting();
    }
  };

  return (
    <Button variant="transparent" onClick={handleSortingClick}>
      {title}
      {isSorted ? (
        isSortedAsc ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <span className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

export const columns: ColumnDef<UserSkill>[] = [
  {
    id: "user",
    accessorFn: (skill) => `${skill.user.name} ${skill.user.surname}`,
    header: ({ column }) => renderColumnHeader({ column, title: "User" }),
  },
  {
    accessorKey: "skill.name",
    header: ({ column }) => renderColumnHeader({ column, title: "Skill" }),
  },
  {
    accessorKey: "experienceValue",
    header: ({ column }) => renderColumnHeader({ column, title: "Experience" }),
    cell: ({ row }) => (
      <Rating fractions={2} value={row.original.experienceValue} readOnly />
    ),
  },
  {
    accessorKey: "likeValue",
    header: ({ column }) => renderColumnHeader({ column, title: "Like" }),
    cell: ({ row }) => (
      <Rating
        fractions={2}
        emptySymbol={<IconHeart color="grey" size={18} />}
        fullSymbol={<IconHeart color="red" size={18} />}
        value={row.original.likeValue}
        readOnly
      />
    ),
  },
];
