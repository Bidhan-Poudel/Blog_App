"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, FileInput } from "@mantine/core";
import { useState } from "react";
import { submitData } from "@/app/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

function ModalDemo() {
  const [opened, { open, close }] = useDisclosure(false);
  const [base64, setBase64] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: submitData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      close();
    },
    onError: () => {
      console.log("error");
    },
  });

  async function handleClick(e) {
    e.preventDefault();
    if (!name || !body) {
      notifications.show({
        title: "Error",
        message: "Please fill all the fields",
        color: "red",
      });
      return;
    }
    mutate({ title: name, body: body, image: base64 });

    notifications.show({
      title: "Success",
      message: "Data submitted successfully",
      color: "blue",
    });
  }

  const handleImageUpload = (file) => {
    if (file){
      console.log(file);
      const reader= new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setBase64(reader.result.toString());
      };
      reader.readAsDataURL(file);
      console.log(reader);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Open">
        <TextInput
          label="Name"
          description="Input description"
          placeholder="Input placeholder"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <TextInput
          label="Body"
          description="Input description"
          placeholder="Input placeholder"
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
        />
        <FileInput
          label="Upload Image"
          description="Input description"
          placeholder="Upload Image"
          onChange={handleImageUpload}
          />
        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={handleClick}
        >
          Sumbit
        </Button>
      </Modal>

      <Button onClick={open}>Create a Blog app</Button>
    </>
  );
}
export default ModalDemo;
