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

const LoginSignUpPage = () => {

  const { registerUser, loginUser, error, setError} = useAuthContext();
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

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (type === "register") {
       registerUser.mutate(form.values,{
          onSuccess:()=>{
            form.reset();
            setError("Registered successfully! Please login to continue.")
          },
          onError:(e)=>{
            setError(e.message);
          }
       });
    } else {
       loginUser.mutate(form.values,{
        onSuccess:()=>{
          form.reset();
          router.replace("/");
          setTimeout(()=>{
            window.location.reload();
          },500)
        },
        onError:(e)=>{
          setError(e.message);
        }
       });
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
        {error && <Text>{error}</Text>} 
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
