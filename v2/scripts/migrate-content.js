#!/usr/bin/env node

/**
 * Migration script to move content from Hugo to Gatsby
 * Preserves directory structure, handles images, and maintains content equivalence
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');

// Configuration
const SOURCE_DIR = path.resolve(__dirname, '../../content/post');
const TARGET_DIR = path.resolve(__dirname, '../content/blog');
const DRY_RUN = process.argv.includes('--dry-run');

// Print configuration
console.log('Migration Configuration:');
console.log(`Source Directory: ${SOURCE_DIR}`);
console.log(`Target Directory: ${TARGET_DIR}`);
console.log(`Dry Run: ${DRY_RUN ? 'Yes' : 'No'}`);

// Ensure target directory exists
if (!DRY_RUN) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Get all post directories
const posts = fs.readdirSync(SOURCE_DIR)
  .filter(file => fs.statSync(path.join(SOURCE_DIR, file)).isDirectory());

console.log(`Found ${posts.length} posts to migrate`);

// Process each post
let migratedCount = 0;
let skippedCount = 0;

posts.forEach(postDir => {
  try {
    const result = migratePost(postDir);
    if (result) migratedCount++;
    else skippedCount++;
  } catch (error) {
    console.error(`Error migrating ${postDir}:`, error);
    skippedCount++;
  }
});

console.log(`\nMigration summary:`);
console.log(`- Successfully migrated: ${migratedCount} posts`);
console.log(`- Skipped/Failed: ${skippedCount} posts`);
console.log(`- Total processed: ${posts.length} posts`);

if (DRY_RUN) {
  console.log('\nThis was a dry run. No files were actually modified.');
  console.log('Run without --dry-run to perform the actual migration.');
}

/**
 * Migrate a single post directory from Hugo to Gatsby
 * @param {string} postDir - The directory name of the post to migrate
 * @returns {boolean} - Whether the migration was successful
 */
function migratePost(postDir) {
  const sourcePostDir = path.join(SOURCE_DIR, postDir);
  
  // Keep the original directory name (which includes the date prefix)
  const targetPostDir = path.join(TARGET_DIR, postDir);
  
  console.log(`\nMigrating: ${postDir}`);
  
  // Read index.md
  const sourceIndexPath = path.join(sourcePostDir, 'index.md');
  if (!fs.existsSync(sourceIndexPath)) {
    console.warn(`No index.md found in ${sourcePostDir}, skipping`);
    return false;
  }
  
  // Parse the content
  const content = fs.readFileSync(sourceIndexPath, 'utf8');
  
  // Use gray-matter to parse frontmatter
  const { data: frontmatter, content: postContent } = matter(content);
  
  // Format date to YYYY-MM-DD if needed
  if (frontmatter.date) {
    const date = new Date(frontmatter.date);
    if (!isNaN(date)) {
      frontmatter.date = date.toISOString().split('T')[0];
    }
  }
  
  // Process tags if present (Hugo uses YAML-style arrays, ensure compatibility)
  if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
    // Tags are already in proper format
    console.log(`  Tags found: ${frontmatter.tags.join(', ')}`);
  }
  
  // Fix image paths in content for Gatsby (add ./ prefix)
  let fixedContent = postContent;
  
  // Match markdown image syntax ![alt](filename.jpg "title") and HTML <img src="filename.jpg">
  // But don't match URLs that already have paths or protocols (e.g., ./image.jpg, https://...)
  const imageRegex = /!\[.*?\]\((?!\.\/|\/|https?:\/\/)(.*?)(\s+".*?")?\)|\<img\s+src="(?!\.\/|\/|https?:\/\/)(.*?)"/g;
  
  fixedContent = fixedContent.replace(imageRegex, (match, mdImage, mdTitle, htmlImage) => {
    if (mdImage) {
      // Markdown image
      const title = mdTitle || '';
      return `![](.\/${mdImage}${title})`;
    } else if (htmlImage) {
      // HTML image
      return `<img src=".\/${htmlImage}"`;
    }
    return match;
  });
  
  console.log('  Fixed image paths in content');
  
  // Create new content with frontmatter
  const newContent = matter.stringify(fixedContent, frontmatter);
  
  if (!DRY_RUN) {
    // Create target directory
    fs.mkdirSync(targetPostDir, { recursive: true });
    
    // Write new index.md
    fs.writeFileSync(path.join(targetPostDir, 'index.md'), newContent);
    
    // Copy all other files (images, etc.)
    const files = fs.readdirSync(sourcePostDir)
      .filter(file => file !== 'index.md');
    
    files.forEach(file => {
      const sourcePath = path.join(sourcePostDir, file);
      const targetPath = path.join(targetPostDir, file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directory recursively
        execSync(`cp -r "${sourcePath}" "${targetPath}"`);
      } else {
        // Copy file
        fs.copyFileSync(sourcePath, targetPath);
      }
      
      console.log(`  Copied: ${file}`);
    });
  }
  
  console.log(`  Completed: ${postDir}`);
  return true;
}