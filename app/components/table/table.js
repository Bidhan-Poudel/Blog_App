'use client';
import { useState } from "react";
import { deleteData } from "@/app/api/api";
import { Button, Table } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import BlogModal from "../modal/createEditModal";
import AlertModal from "../modal/alert";
import { useDisclosure } from "@mantine/hooks";

function DemoTable({ data }) {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const { mutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleDelete = (id) => {
    setDeleteId(id);
    open();
  };

  const confirmDelete = () => {
    mutate(deleteId);
    notifications.show({
      title: "Success",
      message: "Data deleted successfully",
      color: "blue",
      autoClose: 1500,
    });
  };

  const rows = data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>
        <BlogModal
          id={element.id}
          initialTitle={element.title}
          initialBody={element.body}
        />
      </Table.Td>
      <Table.Td>
        <Button onClick={() => handleDelete(element.id)}>Remove</Button>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Id</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <AlertModal
        opened={modalOpened}
        onClose={close}
        onConfirm={confirmDelete}
      />
      <Table captionSide="bottom">
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

export default DemoTable;
