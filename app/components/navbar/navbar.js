"use client";

import { useState } from "react";
import classes from "./navbar.module.css";
import { Title } from "@mantine/core";
import Link from "next/link";

const path = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
  },
];

function Navbar(props) {
  const [activeLink, setActiveLink] = useState(props.name);

  const links = path.map((link) => (
    <>
      <Link
        href={link.url}
        className={classes.link}
        onClick={(event) => {
        //   event.preventDefault();
          setActiveLink(link.name);
        }}
        key={link.url}
      >
        {link.name}
      </Link>
    </>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {activeLink}
          </Title>
          {links}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
