import type { Skill } from "@/generated";
import { createFormContext } from "@mantine/form";

export interface AddUserSkillFormValues {
  skillId: Skill["id"];
  experienceValue: Skill["experienceValue"];
  likeValue: Skill["likeValue"];
}

export const skillForm = {
  initialValues: {
    skillId: 0,
    experienceValue: 0,
    likeValue: 0,
  },
  validate: {
    skillId: (value: number) => (value ? null : "Skill is required"),
  },
};

export const [
  UserSkillFormProvider,
  useUserSkillFormContext,
  useUserSkillForm,
] = createFormContext<AddUserSkillFormValues>();
