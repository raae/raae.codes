import React from "react";
import { graphql } from "gatsby";
import { BaseStyles } from "theme-ui";
import { Layout } from "../components/layout";

const PageTemplate = ({ data, path }) => {
  const post = data.markdownRemark;

  return (
    <Layout
      variant={path === "/" ? "root" : "article"}
      title={post.frontmatter.title}
      description={post.excerpt}
    >
      <article>
        <BaseStyles
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></BaseStyles>
      </article>
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
