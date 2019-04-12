import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

const PageTemplate = ({ data, location }) => {
  const post = data.markdownRemark;

  return (
    <Layout
      location={location}
      title={post.frontmatter.title}
      description={post.excerpt}
    >
      <article className={post.fields.slug}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
