"use client";

import classes from "./navbar.module.css";
import { Title } from "@mantine/core";
import Link from "next/link";
import { randomId } from "@mantine/hooks";

function DashboardNavbar(props) {
  const id = randomId();
  // console.log(id);
  const path = [
    {
      name: "Blogs",
      url: "/dashboard",
    },
  ];

  props.name==="Admin Dashboard" && path.push({
    name:props.name==="Admin Dashboard"?"Users":"",
      url: "/dashboard/users",
    });
    

  const links = path.map((link) => (
    <>
      <Link href={link.url} className={classes.link} key={props.url}>
        {link.name}
      </Link>
    </>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {props.name}
          </Title>
          {links}
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
