import React from "react";
import { graphql } from "gatsby";
import { BaseStyles, Divider } from "theme-ui";
import { Layout } from "../components/layout";
import { Newsletter } from "../components/newsletter";

const PageTemplate = ({ data, location }) => {
  const post = data.markdownRemark;

  return (
    <Layout
      variant={location.pathname === "/" ? "root" : "article"}
      title={post.frontmatter.title}
      description={post.excerpt}
    >
      <article>
        <BaseStyles
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></BaseStyles>
      </article>
      <Divider />
      <Newsletter />
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`;
