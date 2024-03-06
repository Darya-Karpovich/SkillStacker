import { ActionIcon, Flex } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

interface Props {
  onEdit: () => void;
  onAdd: () => void;
  onDelete: () => void;
}
export const HeaderActions = ({ onEdit, onAdd, onDelete }: Props) => {
  const actions = [
    { action: onAdd, Icon: IconPlus },
    { action: onEdit, Icon: IconEdit },
    { action: onDelete, Icon: IconTrash },
  ];

  return (
    <Flex gap={10} justify="flex-end">
      {actions.map(({ Icon, action }, index) => (
        <ActionIcon
          key={index}
          variant="subtle"
          style={{ border: "1px solid #74c0fc" }}
          onClick={action}
        >
          <Icon />
        </ActionIcon>
      ))}
    </Flex>
  );
};
