# Hugo to Gatsby Content Migration

This document outlines the content migration process from the existing Hugo blog to the Gatsby v2 site.

## Migration Setup

We've created a comprehensive migration solution that:

1. Preserves the original directory structure (including date prefixes)
2. Maintains all frontmatter (title, date, tags)
3. Copies all images and other assets
4. Ensures content equivalence between sites

## Migration Process

To migrate content from Hugo to Gatsby:

1. Run the migration script:
   ```bash
   cd /home/charly/workspace/blog/v2
   npm run migrate
   ```

2. Build the Gatsby site to verify the content:
   ```bash
   npm run build
   npm run serve
   ```

3. Review the site to ensure all content appears correctly

## Features Implemented

- **Directory Structure**: Maintains the original YYYYMMDD-slug format
- **Frontmatter**: Preserves all metadata (title, date, tags)
- **Markdown Content**: Keeps all markdown syntax intact
- **Images**: 
  - Copies all images to the appropriate directories
  - Automatically fixes image paths in markdown to use Gatsby's preferred `./` prefix
  - Ensures images are properly displayed in posts
  - Implements Gatsby image optimization (responsive images, lazy loading, WebP format)
- **Tags**: Added support for displaying post tags

## Technical Implementation

The migration script (`v2/scripts/migrate-content.js`):
- Reads posts from the Hugo content directory
- Parses frontmatter with gray-matter
- Formats dates consistently
- Handles arrays of tags
- Creates equivalent directory structure in Gatsby
- Copies all images and assets

The Gatsby configuration has been updated to:
- Display tags on each post
- Include tags in GraphQL queries
- Process and optimize images with gatsby-plugin-sharp, gatsby-transformer-sharp
- Handle relative image paths with gatsby-remark-relative-images and gatsby-remark-images

## Testing

You can run a dry-run to see what would be migrated without making changes:
```bash
npm run migrate:dry
```

This will show you all posts that would be migrated and report any issues.

## Directory Structure

- **Hugo**: `/content/post/YYYYMMDD-slug/index.md`
- **Gatsby**: `/v2/content/blog/YYYYMMDD-slug/index.md`

This structure maintains chronological ordering and ensures images are properly referenced.

## URL Structure

The migrated posts will be available at:
- `/{YYYYMMDD-slug}/`

For example:
- `/20230409-cheap-thought/`

This preserves the date prefix in the URL, which helps with chronological organization.