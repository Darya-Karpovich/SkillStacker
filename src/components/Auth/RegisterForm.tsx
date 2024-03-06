import type { CreateUserInput } from "@/generated";
import { Button, Input, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

const registerForm = {
  initialValues: {
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
  },

  validate: {
    email: (value: string) =>
      /^\S+@\S+$/.test(value) ? null : "Invalid email",
    name: (value: string) =>
      value.length > 3 ? null : "Name should be at least 3 characters long",
    surname: (value: string) =>
      value.length > 3 ? null : "Surname should be at least 3 characters long",
    password: (value: string) =>
      value.length > 5 ? null : "Password should be at least 6 characters long",
    confirmPassword: (value: string, values: any) =>
      value === values.password ? null : "Passwords should match",
  },
};

interface RegisterFormProps {
  register: (values: CreateUserInput) => void;
}

export const RegisterForm = ({ register }: RegisterFormProps) => {
  const form = useForm(registerForm);
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        register({
          email: values.email,
          name: values.name,
          surname: values.surname,
          password: values.password,
        });
        form.reset();
      })}
    >
      <Stack gap={20}>
        <Input placeholder="Name" {...form.getInputProps("name")} />
        <Input placeholder="Surname" {...form.getInputProps("surname")} />
        <Input placeholder="Email" {...form.getInputProps("email")} />
        <PasswordInput
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Confirm Password"
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
