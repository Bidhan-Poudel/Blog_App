"use client";

import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  FileInput,
  ActionIcon,
  rem,
  Textarea,
  Image,
  Container,
  CloseButton,
} from "@mantine/core";
import { useState } from "react";
import { submitData, updateData } from "@/app/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";
import { useAuthContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

function CreateEditModal(props) {
  const { initialBody, initialTitle, id, initialImage } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState(initialTitle || "");
  const [body, setBody] = useState(initialBody || "");
  const [image, setImage] = useState(initialImage || null);
  const [base64, setBase64] = useState(initialImage || "");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const user = JSON.parse(window.localStorage.getItem("currentUser"));

  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  const { mutate: createMutate } = useMutation({
    mutationFn: submitData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      close();
      notifications.show({
        title: "Success!",
        message: "Data submitted successfully",
        color: "teal",
      });
    },
    onError: () => {
      setError("Failed to submit blog");
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      close();
      notifications.show({
        title: "Success!",
        message: "Blog updated successfully",
        color: "teal",
      });
    },
    onError: () => {
      setError("Failed to update blog");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body || !base64) {
      setError("Please fill all the fields");
      return;
    }

    if (id) {
      updateMutate({ title, body, id, image: base64 });
    } else {
      // addPost(title, body, base64, "pending", user.id);
      createMutate({
        title,
        body,
        image: base64,
        status: "pending",
        userId: user.id,
      });
    }
    setTitle("");
    setBody("");
    setImage(null);
    setBase64("");

    router.replace('/dashboard');
  };

  const handleImageUpload = (file) => {
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={id ? "Edit Blog" : "Create Blog"}
        centered
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Textarea
            label="Body"
            placeholder="Enter blog body"
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
          />
          {image && (
            <Container my={"md"} py={"xs"} pos={"relative"}>
              <CloseButton onClick={() => setImage(null)} />
              <Image
                src={base64}
                alt="Current Image"
                width={100}
                height={100}
                fit="cover"
                mb="md"
              />
            </Container>
          )}
          {!image && (
            <FileInput
              label="Upload Image"
              description="Input description"
              placeholder="Upload Image"
              onChange={handleImageUpload}
            />
          )}
          <Button color="blue" fullWidth mt="md" radius="md" type="submit">
            {id ? "Update" : "Submit"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </Modal>

      {id ? (
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => {
            if (!isLoggedIn) {
              router.push("/login");
              return;
            }
            open();
          }}
        >
          <IconPencil
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
      ) : (
        <Button
          onClick={() => {
            if (!isLoggedIn) {
              router.push("/login");
              return;
            }
            open();
          }}
        >
          Create Blog
        </Button>
      )}
    </div>
  );
}

export default CreateEditModal;
