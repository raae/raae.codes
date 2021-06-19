import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { Box } from "theme-ui";

export const Avatar = (props) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        display: "block",
        borderRadius: "50%",
        borderWidth: "0.75vw",
        borderStyle: "solid",
        borderColor: "secondary",
        overflow: "hidden",
      }}
    >
      <StaticQuery
        query={query}
        render={(data) => {
          const { author } = data.site.siteMetadata;
          return (
            <Image
              className="Cover"
              fluid={data.avatar.childImageSharp.fluid}
              alt={author}
            />
          );
        }}
      />
    </Box>
  );
};

const query = graphql`
  query avatarQuery {
    avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`;
