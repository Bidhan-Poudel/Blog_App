"use client";
import { verifyData, deleteData } from "@/app/api";
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  rem,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AlertModal from "../modal/alert";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CreateEditModal from "../modal/createEditModal";
import { useAuthContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";
import Link from "next/link";

export function PostsTable({ data }) {
  const router = useRouter();
  const { isLoggedIn,currentUser, isAdmin } = useAuthContext();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const [modalOpened, { open, close }] = useDisclosure(false);


  const { mutate: verifyStatus } = useMutation({
    mutationFn: verifyData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      notifications.show({
        title: "Success",
        message: "Data verified successfully",
        color: "blue",
        autoClose: 1500,
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to verify data",
        color: "red",
        autoClose: 1500,
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      notifications.show({
        title: "Success",
        message: "Data deleted successfully",
        color: "blue",
        autoClose: 1500,
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete data",
        color: "red",
        autoClose: 1500,
      });
    },
  });

  const handleDelete = (id) => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setDeleteId(id);
    setModalContent("Are you sure you want to delete this item?");
    open();
  };

  const handleVerify = (item) => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setStatusId(item);
    setModalContent("Do you want to verify this item?");
    open();
  };

  const confirmDelete = () => {
    mutate(deleteId);
    close();
  };

  const confirmVerify = () => {
    // Handle the verification logic here, e.g., update the status to "verified"
    // Assuming there's a function `verifyData` to handle verification
    verifyStatus(statusId);
    close();
  };

  const userData = isAdmin
    ? data
    : data.filter((item) => item.userId === currentUser.id);


  const rows = userData?.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td className={styles.centered}>
        <Group gap="sm">
          <Avatar size={30} src={item.image} radius={30} />
          <Text
            fz="sm"
            fwfz="sm"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              width: "100%",
            }}
          >
            {item.title}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td className={styles.centered}>
        <Text
          fz="sm"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            width: "100%",
          }}
        >
          {item.body}
        </Text>
      </Table.Td>
      <Table.Td className={styles.centered}>
        <Text
          fz="sm"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            width: "100%",
          }}
        >
          {item.status}
        </Text>
      </Table.Td>
      <Table.Td className={styles.centered}>
        <Group gap={0} justify="center">
          <Link href={`/blog/edit/${item.id}`}>
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Link>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDelete(item.id)}
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          {isAdmin && item.status==='pending' && (
            <Button
              variant="subtle"
              color="green"
              onClick={() => handleVerify(item)}
            >
              Verify
            </Button>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <tr>
      <th>Title</th>
      <th>Body</th>
      <th>Status</th>
      <th>Edit</th>
    </tr>
  );

  return (
    <>
      <AlertModal
        opened={modalOpened}
        onClose={close}
        onConfirm={
          modalContent.includes("delete") ? confirmDelete : confirmVerify
        }
        content={modalContent}
      />
      <div style={{ overflowX: "auto", minWidth: 300 }}>
        <Table
          flex="end"
          verticalSpacing="sm"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </>
  );
}

export default PostsTable;
