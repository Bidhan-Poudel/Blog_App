import React from "react";
import {
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import classes from "./card.module.css";
import Link from "next/link";

export function CustomCard({ name, body, image, id }) {
  return (
    <Container p={"md"}>
      <Link href={`./blog/${id}`}>
        <Card
          key={id}
          p="md"
          w={400}
          radius="md"
          component="div"
          className={classes.card}
        >
          <AspectRatio ratio={1920 / 1080}>
            <Image src={image} />
          </AspectRatio>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
            {name}
          </Text>
          <Text className={classes.title} mt={5}>
            {body}
          </Text>
        </Card>
      </Link>
    </Container>
  );
}
