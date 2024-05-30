import React from "react";
import CardContainer from "../components/Container/cardContainer";

const Blog = () => {

  return (
    <>
      <div
        style={{
            textAlign: "center",
            font: "700 20px 'Greycliff CF', sans-serif",
            color: "black"
        }}
      >
        Blog List
      </div>
      <CardContainer location="Home" />
    </>
  );
};

export default Blog;
