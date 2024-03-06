import { TableColumnName } from "@/components/SkillsTable/TableColumnName";
import { Group } from "@mantine/core";
import { useState } from "react";

const TABLE_COLUMN_NAMES = [
  {
    name: "Name",
    sort: null,
  },
  {
    name: "Skill",
    sort: null,
  },
  {
    name: "Experience",
    sort: null,
  },
  {
    name: "Likes",
    sort: null,
  },
];

export function TableHeader() {
  const [columnSorting, setColumnSorting] = useState(TABLE_COLUMN_NAMES);
  
  return (
    <Group grow>
      {columnSorting.map((column) => (
        <TableColumnName
          key={column.name}
          name={column.name}
          sort={column.sort}
        />
      ))}
    </Group>
  );
}
