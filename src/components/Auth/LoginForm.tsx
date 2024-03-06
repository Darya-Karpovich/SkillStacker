import type { LoginUserInput } from "@/generated";
import { Button, Input, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

const loginForm = {
  initialValues: {
    email: "",
    password: "",
  },

  validate: {
    email: (value: string) =>
      /^\S+@\S+$/.test(value) ? null : "Invalid email",

    password: (value: string) =>
      value.length > 5 ? null : "Password should be at least 6 characters long",
  },
};

interface LoginFormProps {
  login: (values: LoginUserInput) => void;
}

export const LoginForm = ({ login }: LoginFormProps) => {
  const form = useForm(loginForm);

  return (
    <form onSubmit={form.onSubmit((values) => login(values))}>
      <Stack gap={20}>
        <Input placeholder="Email" {...form.getInputProps("email")} />
        <PasswordInput
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
