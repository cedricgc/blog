/**
 * @type {import('gatsby').GatsbyNode}
 */
const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPostTemplate = path.resolve(__dirname, './src/templates/blog-post.js');

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: ASC }}
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`, result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  if (posts.length > 0) {
    posts.forEach((post) => {
      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // Get the parent file node
    const parent = getNode(node.parent);
    
    // Get the directory name
    const dirName = parent.relativeDirectory.split('/').pop();
    
    // Create the slug - note that 'blog' is already part of the path in Gatsby config
    const value = `/${dirName}`;
    
    console.log(`Creating slug for ${parent.name} in ${parent.relativeDirectory}: ${value}`);
    
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
