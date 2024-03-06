import { Flex, Button } from "@mantine/core";
import { Action } from "./UserSkillsTable";

const getButtonLabel = (action: Action) => {
  switch (action) {
    case Action.Add:
      return "Add";
    case Action.Edit:
      return "Save";
    default:
      return "Delete";
  }
};

export const FooterButtons = ({
  action,
  onSubmit,
  onCancel,
}: {
  onSubmit: () => void;
  onCancel: () => void;
  action: Action;
}) => {
  return (
    <Flex justify="flex-end" gap={10}>
      <Button variant="outline" size="xs" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="xs" onClick={onSubmit}>
        {getButtonLabel(action)}
      </Button>
    </Flex>
  );
};
