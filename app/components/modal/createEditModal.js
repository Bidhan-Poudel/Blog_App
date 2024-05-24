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

function CreateEditModal(props) {
  const { initialBody, initialTitle, id, initialImage } = props;
  console.log(initialBody);
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState(initialTitle || "");
  const [body, setBody] = useState(initialBody || "");
  const [image, setImage] = useState(initialImage || null);
  const [base64, setBase64] = useState(initialImage || "");
  const queryClient = useQueryClient();

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
      console.log("error");
      notifications.show({
        title: "Error!",
        message: "Failed to submit data",
        color: "red",
      });
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
      console.log("error");
      notifications.show({
        title: "Error!",
        message: "Failed to update blog",
        color: "red",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body || !base64) {
      notifications.show({
        title: "Error",
        message: "Please fill all the fields",
        color: "red",
      });
      return;
    }

    if (id) {
      updateMutate({ title, body, id, image: base64 });
    } else {
      createMutate({ title, body, image: base64 });
    }
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
      {opened && (
        <Modal
          opened={opened}
          onClose={close}
          title={id ? "Edit Blog" : "Create Blog"}
          centered
        >
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
            <Container my={"md"} py={"xs"} bg={"indigo"} pos={"relative"}>
              <CloseButton onClick={() => setImage(null)} />
              <Image
                src={initialImage}
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

          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={handleSubmit}
          >
            {id ? "Update" : "Submit"}
          </Button>
        </Modal>
      )}
      {id ? (
        <ActionIcon variant="subtle" color="gray" onClick={open}>
          <IconPencil
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
      ) : (
        <Button onClick={open}>Create Blog</Button>
      )}
    </div>
  );
}

export default CreateEditModal;
