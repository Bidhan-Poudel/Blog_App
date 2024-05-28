"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Select,
} from "@mantine/core";
import { useAuthContext } from "../context/authContext";
import { ROLES } from "../constants/role";
import { useRouter } from "next/navigation";

import { login, register } from "../api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginSignUpPage = () => {
  const queryClient = useQueryClient();

  const { mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("Logged in");
    },
    onError: () => {
      console.log("Error logging in");
    },
  });

  const { mutate: registerMutate } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("Registered");
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const { registerUser, loginUser } = useAuthContext();
  const router = useRouter();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      role: ROLES.USER,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "register") {
      const res = await registerUser(form.values);
      if (res.success) {
        form.reset();
        registerMutate(form.values);
      }
    } else {
      const res = await loginUser(form.values);
      if (res.success) {
        form.reset();
        loginMutate(form.values);
        router.back();
      }
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={handleSubmit}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

          {type === "register" && (
            <Select
              label="Role"
              placeholder="Select your role"
              radius="md"
              value={form.values.role}
              onChange={(value) => form.setFieldValue("role", value)}
              data={[
                { value: ROLES.USER, label: "User" },
              ]}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default LoginSignUpPage;
