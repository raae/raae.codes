/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

const Cover = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
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
  );
};

const query = graphql`
  query coverQuery {
    avatar: file(absolutePath: { regex: "/cover.jpg/" }) {
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

export default Cover;
