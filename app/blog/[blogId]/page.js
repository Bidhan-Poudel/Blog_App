'use client';
import { getDataById } from '@/app/api'
import { Card, Container, Image, Text , AspectRatio} from '@mantine/core';
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const BlogDetail = ({params}) => {
  
    const {data, isLoading, isError}= useQuery({
      queryFn:()=>getDataById(params.blogId),
      queryKey:["blog", params.blogId],
    });
    

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Sorry!!! No Data Found</div>
    if(data.length === 0) return <div>No data found</div>


  return (
    <div>
       <Container my={20} >
        <Card shadow = "xs" padding="md" radius="md">
            <Card.Section>
                <Text fs={100} fw={700} p={20} ta={'center'}>{data.title}</Text>
                <AspectRatio ratio={1920 / 720} p={20}  >
                    <Image src={data.image} />
                </AspectRatio>
                <Text fs={20} p={20} ta={'justify'}>{data.body}</Text>
            </Card.Section>
        </Card>
       </Container>
    </div>
  )
}

export default BlogDetail