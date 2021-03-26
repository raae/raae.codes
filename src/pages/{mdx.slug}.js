import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import Layout from "../components/layout";
import Logo from "../components/logo";

const mxdComponents = {
  Logo,
};

const MDXPage = ({ data, location }) => (
  <Layout location={location}>
    <MDXProvider components={mxdComponents}>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </MDXProvider>
  </Layout>
);

export const query = graphql`
  {
    mdx {
      slug
      body
    }
  }
`;

export default MDXPage;
