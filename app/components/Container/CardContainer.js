"use client";

import { getData } from "@/app/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostsTable from "../table/table2";
import { Grid } from "@mantine/core";
import { CustomCard } from "../cards/customCard";

const CardContainer = (props) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getData,
    queryKey: ["blog"],
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const verifiedData= data.filter((item)=>item.status=='verified');

  return (
    <>
      <Grid gutter={{  xs: "sm", md: "md", xl: 24 }} p={"sm"}>
        {props.location === "Home" &&
          verifiedData?.map((item) => (
            <Grid.Col key={item.id} span={4}>
              <CustomCard id={item.id} image={item.image} name={item.title} body={item.body} />
            </Grid.Col>
          ))}
      </Grid>
      {(props.location === "Dashboard"||props.location==="Admin Dashboard") && (
          <PostsTable data={data} />
      )}
    </>
  );
};

export default CardContainer;
