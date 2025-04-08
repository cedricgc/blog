# Content Migration: Hugo to Gatsby

This directory contains scripts to migrate content from the existing Hugo blog to the Gatsby v2 site.

## Migration Script

The main migration script (`migrate-content.js`) handles:

- Preserving directory structure (including date prefixes for ordering)
- Maintaining frontmatter content (title, date, tags)
- Properly copying, linking, and optimizing images
- Ensuring markdown compatibility

## Usage

The migration script has been added to package.json and can be run with:

```bash
# Run a dry run (no files will be changed)
npm run migrate:dry

# Perform the actual migration
npm run migrate
```

## How It Works

The script:

1. Reads all directories in the Hugo posts folder (`/content/post/`)
2. For each post, parses the frontmatter and content
3. Creates a matching directory structure in the Gatsby content folder (`/v2/content/blog/`)
4. Copies all image files and other assets
5. Ensures frontmatter is properly formatted for Gatsby

## Directory Structure

The script preserves the original directory names, which include date prefixes:

- Hugo: `/content/post/YYYYMMDD-slug/index.md`
- Gatsby: `/v2/content/blog/YYYYMMDD-slug/index.md`

This maintains the chronological ordering and ensures images and other assets remain properly linked within each post.

## Post-Migration Steps

After running the migration:

1. Build the Gatsby site to verify the content:
   ```bash
   npm run build
   ```

2. Review the site visually to ensure:
   - All posts appear correctly
   - Images are properly displayed and optimized (responsive, lazy-loaded)
   - Markdown formatting is preserved
   - WebP image format is generated for modern browsers

3. Check for any warnings in the build log that might indicate issues

4. The configured image processing features include:
   - Responsive images at various sizes
   - WebP format for modern browsers
   - Image lazy loading
   - Maximum width of 800px
   - Image captions (from alt text)

## Troubleshooting

If you encounter issues:

- Check the console output for errors
- Verify that the directory structure is preserved
- Ensure image paths are correct in the markdown content 
  (the script automatically adds the required './' prefix to image paths)
- Validate that frontmatter is properly formatted