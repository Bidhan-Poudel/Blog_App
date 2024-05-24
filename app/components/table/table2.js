"use client";
import { deleteData } from "@/app/api";
import { Avatar, Table, Group, Text, ActionIcon, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AlertModal from "../modal/alert";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CreateEditModal from "../modal/createEditModal";

export function UsersTable({ data }) {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpened, { open, close }] = useDisclosure(false);
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
    setDeleteId(id);
    open();
  };

  const confirmDelete = () => {
    mutate(deleteId);
    close();
  };

  const rows = data.map((item) => (
    console.log(item),
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.image} radius={30} />
          <Text fz="sm" fwfz="sm"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            width: "100%",
          }}>
            {item.title}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
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
      <Table.Td>
        <Group gap={0} justify="center">
          <CreateEditModal id={item.id} initialTitle={item.title} initialBody={item.body} initialImage={item.image}/>
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
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <tr>
      <th>Title</th>
      <th>Body</th>
      <th>Edit</th>
    </tr>
  );

  return (
    <>
      <AlertModal
        opened={modalOpened}
        onClose={close}
        onConfirm={confirmDelete}
      />
      <div style={{ overflowX: "auto", minWidth: 300 }}>
        <Table flex="end" verticalSpacing="sm" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </>
  );
}

export default UsersTable;
