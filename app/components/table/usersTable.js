'use client'
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Text } from "@mantine/core";
import { getUsers } from "@/app/api/users";
import { useDisclosure } from "@mantine/hooks";
import AlertModal from "../modal/alert";
import styles from "./table.module.css"; // Adjust the path as necessary

const UsersTable = () => {
//   const [modalOpened, { open, close }] = useDisclosure(false);

  const { data, isLoading, isError } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const rows = data?.map((item) => (
    <Table.Tr key={item.id}>
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
          {item.id}
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
          {item.name}
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
          {item.email}
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
          {item.role}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {/* <AlertModal opened={modalOpened} close={close} /> */}
      <div style={{ overflowX: "auto", minWidth: 300 }}>
        <Table
          flex="end"
          verticalSpacing={"md"}
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead>
            <Table.Tr>
              <Table.Th className={styles.centered}>ID</Table.Th>
              <Table.Th className={styles.centered}>Name</Table.Th>
              <Table.Th className={styles.centered}>Email</Table.Th>
              <Table.Th className={styles.centered}>Role</Table.Th>
            </Table.Tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </>
  );
};

export default UsersTable;
