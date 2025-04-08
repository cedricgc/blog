import * as React from 'react';
import { Link, graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  
  return (
    <main>
      <title>My Blog</title>
      <h1>Welcome to My Blog</h1>
      <p>A new Gatsby-powered blog</p>
      
      <h2>Recent Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.fields?.slug}>
              <article>
                <h3>
                  <Link to={post.fields?.slug || "/"}>
                    {post.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.frontmatter.date}</small>
                <p>{post.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blog posts found.</p>
      )}
    </main>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC }}
      limit: 10
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
`;

export default IndexPage;
