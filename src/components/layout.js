import React from "react";
import { Link } from "gatsby";
import { Container, Flex, Box } from "theme-ui";

import SEO from "./seo";
import Cover from "./cover";
import { Avatar } from "./avatar";

export const Layout = ({ title, description, children }) => {
  const cover = <Cover />;

  return (
    <>
      <SEO title={title} description={description} />
      <Flex
        as="header"
        sx={{
          zIndex: 1000,
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",
          width: "10vw",
          height: "10vw",
          right: "0",
          top: "0",
          borderBottomLeftRadius: "50%",
          backgroundColor: "background",
        }}
      >
        <Avatar as={Link} to="/" sx={{ width: "7vw", height: "7vw" }} />
      </Flex>
      <Container as="main">{children}</Container>
      <Box>{cover}</Box>
    </>
  );
};
