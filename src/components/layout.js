import React from "react";
import { Link } from "gatsby";
import { Container, Flex, Box } from "theme-ui";

import SEO from "./seo";
import Cover from "./cover";
import { Avatar } from "./avatar";

export const Layout = ({ title, variant, description, children }) => {
  const cover = <Cover />;

  return (
    <>
      <SEO title={title} description={description} />
      {variant !== "root" && (
        <Flex
          as="header"
          sx={{
            zIndex: 1000,
            position: "fixed",
            alignItems: "center",
            justifyContent: "center",
            width: "10vw",
            height: "10vw",
            right: "1vw",
            top: "1vw",
            borderRadius: "50%",
            backgroundColor: "background",
          }}
        >
          <Avatar as={Link} to="/" sx={{ width: "8vw", height: "8vw" }} />
        </Flex>
      )}
      <Container variant="main" as="main">
        {children}
      </Container>
      <Box>{cover}</Box>
    </>
  );
};
