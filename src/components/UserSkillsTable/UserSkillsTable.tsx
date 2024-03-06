"use client";

import type { User } from "@/generated";
import {
  GetCurrentUserDocument,
  useAddUserSkillMutation,
  useDeleteUserSkillsMutation,
  useUpdateUserSkillsMutation,
} from "@/generated";
import { Box, Stack } from "@mantine/core";
import { HeaderActions } from "./HeaderActions";
import React, { useState } from "react";
import { AddSkillForm } from "./AddSkillForm";
import { HeaderGroup } from "./HeaderGroup";
import { UserSkillRow } from "./UserSkillRow";
import { FooterButtons } from "./FooterButtons";
import type { AddUserSkillFormValues as UserSkillFormValues } from "./FormContext";
import {
  UserSkillFormProvider,
  useUserSkillForm,
  useUserSkillFormContext,
} from "./FormContext";

export enum Action {
  Add = "add",
  Edit = "edit",
  Delete = "delete",
}

export function withUserSkillFormProvider(component: React.ReactNode) {
  function InternalComponent() {
    const form = useUserSkillForm();
    return (
      <UserSkillFormProvider form={form}>{component}</UserSkillFormProvider>
    );
  }
  return <InternalComponent />;
}

interface UserSkillsTableProps {
  skills: User["skills"];
}
export const UserSkillsTable = ({ skills }: UserSkillsTableProps) => {
  const form = useUserSkillFormContext();
  const [action, setAction] = useState<Action | null>(null);
  const [editedSkills, setEditedSkills] = useState(skills);
  const [skillsToDelete, setSkillsToDelete] = useState<number[]>([]);
  const [addUserSkill] = useAddUserSkillMutation();
  const [updateUserSkills] = useUpdateUserSkillsMutation();
  const [deleteUderSkills] = useDeleteUserSkillsMutation();

  const onEdit = (id: number, value: number, valueName: string) => {
    const newSkills = editedSkills.map((skill) => {
      if (skill.id === id) {
        return {
          ...skill,
          [valueName]: value,
        };
      }
      return skill;
    });
    setEditedSkills(newSkills);
  };
  const onDelete = (id: number, isChecked: boolean) => {
    isChecked
      ? setSkillsToDelete((prev) => [...prev, id])
      : setSkillsToDelete((prev) => prev.filter((skillId) => skillId !== id));
  };
  const onSubmitEditedSkills = async () => {
    const { errors } = await updateUserSkills({
      variables: {
        input: {
          skills: editedSkills.map((skill) => ({
            id: skill.id,
            experienceValue: skill.experienceValue,
            likeValue: skill.likeValue,
          })),
        },
      },
      refetchQueries: [GetCurrentUserDocument],
    });
    if (errors?.length) {
      console.log(errors);
    }
  };

  const onSubmitDeleting = async () => {
    await deleteUderSkills({
      variables: {
        input: {
          skillIds: skillsToDelete,
        },
      },
      refetchQueries: [GetCurrentUserDocument],
    });
    setSkillsToDelete([]);
  };

  const onAddUserSkill = async (input: UserSkillFormValues) => {
    const { errors } = await addUserSkill({
      variables: {
        input: {
          skillId: input.skillId,
          experienceValue: input.experienceValue,
          likeValue: input.likeValue,
        },
      },
      refetchQueries: [GetCurrentUserDocument],
    });
    if (errors?.length) {
      console.log(errors);
    }
  };

  const handleSubmit = () => {
    if (action === Action.Add) {
      form.onSubmit(onAddUserSkill)();
    }
    if (action === Action.Edit) {
      onSubmitEditedSkills();
    }
    if (action === Action.Delete) {
      onSubmitDeleting();
    }
  };

  return (
    <UserSkillFormProvider form={form}>
      <Box w="100%">
        <HeaderActions
          onEdit={() => setAction(Action.Edit)}
          onAdd={() => setAction(Action.Add)}
          onDelete={() => setAction(Action.Delete)}
        />
        <Stack
          p="lg"
          my="sm"
          style={{ border: "1px solid grey", borderRadius: 10 }}
        >
          <HeaderGroup />
          {editedSkills.map((skill) => (
            <UserSkillRow
              key={skill.id}
              skill={skill}
              onEdit={onEdit}
              onChangeSelectedSkills={onDelete}
              actionType={action}
            />
          ))}
          {action === Action.Add && <AddSkillForm onSubmit={onAddUserSkill} />}
        </Stack>
        {action && (
          <FooterButtons
            onSubmit={handleSubmit}
            onCancel={() => {
              setAction(null);
              setEditedSkills(skills);
              setSkillsToDelete([]);
            }}
            action={action}
          />
        )}
      </Box>
    </UserSkillFormProvider>
  );
};
