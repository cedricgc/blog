import * as React from 'react';
import { graphql, Link } from 'gatsby';

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  
  return (
    <article>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr />
      <Link to="/">← Back to all posts</Link>
    </article>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default BlogPostTemplate;
