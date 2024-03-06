import { Button, Title } from "@mantine/core";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
export enum Sort {
  ASC = "asc",
  DESC = "desc",
}

interface Props {
  name: string;
  sort?: Sort | null;
  onClick?: (name: string) => void;
}
export const TableColumnName = ({ name, sort, onClick }: Props) => {
  const sortIcon = (sort: Sort) => {
    switch (sort) {
      case Sort.ASC:
        return <IconArrowNarrowUp size={16} />;
      case Sort.DESC:
        return <IconArrowNarrowDown size={16} />;
      default:
        return null;
    }
  };
  return (
    <Button
      variant="subtle"
      rightSection={sort ? sortIcon(sort) : null}
      style={{ display: "flex", alignItems: "flex-start" }}
      onClick={() => onClick}
    >
      <Title order={4}>{name}</Title>
    </Button>
  );
};
