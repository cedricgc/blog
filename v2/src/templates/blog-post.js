import * as React from 'react';
import { graphql, Link } from 'gatsby';

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const tags = post.frontmatter.tags || [];
  
  return (
    <article>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      {tags.length > 0 && (
        <div className="tags">
          <span>Tags: </span>
          {tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}{i < tags.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
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
        tags
      }
    }
  }
`;

export default BlogPostTemplate;
