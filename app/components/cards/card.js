"use client";

import { Card, Image, Text, Button } from "@mantine/core";
import Link from "next/link";

function CardDemo({ name, body, image ,id}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} height={160} alt="img" />
      </Card.Section>

      <Text
        fz="sm"
        fw={500}
        mb={20}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
        }}
      >
        {name}
      </Text>
      <Text
        size="sm"
        c="dimmed"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
        }}
      >
        {body}
      </Text>

      <Link href={`./blog/${id}`}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Read More
        </Button>
      </Link>
    </Card>
  );
}

export default CardDemo;
