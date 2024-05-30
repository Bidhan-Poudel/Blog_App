"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, CloseButton, Container, FileInput, Image, Text, TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { submitData } from "@/app/api";

const AddPostPage = () => {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState("");

  const user = JSON.parse(window.localStorage.getItem("currentUser"));
  
  const router= useRouter();

  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation({
    mutationFn: submitData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body || !base64) {
      setError("Please fill all the fields");
      return;
    }
    createMutate({
      title,
      body,
      image: base64,
      status: "pending",
      userId: user.id,
    });

    setImage(null);
    setTitle("");
    setBody("");
    setBase64("");

    router.push("/dashboard");
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
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <Text align="center" style={{ marginBottom: 20 }}>
          Add Post
        </Text>
        <TextInput label="Title" placeholder="Enter blog title" value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
        <Textarea label="Body" placeholder="Enter blog body" value={body} onChange={(e)=>setBody(e.currentTarget.value)} />
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
        <FileInput
          label="Image"
          onChange={handleImageUpload}
          placeholder="Upload image"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Button type="submit" onSubmit={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    boxSizing: "border-box",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
};

export default AddPostPage;
