import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllProducts() {
  const productsDir = path.join(contentDirectory, 'products');
  const fileNames = fs.readdirSync(productsDir);
  
  const products = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(productsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      ...data
    };
  });
  
  return products;
}

export function getSiteConfig() {
  const configPath = path.join(process.cwd(), 'site-config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(configData);
}
// ==================== BLOG / ARTICLE FUNCTIONS ====================

/**
 * Get all blog posts/articles
 * @returns {Array} Array of blog posts with metadata
 */
export function getAllBlogPosts() {
  const blogDir = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogDir);
  
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        content,
        title: data.title || '',
        author: data.author || 'B13 Factory',
        date: data.date || new Date().toISOString(),
        category: data.category || 'uncategorized',
        image: data.image || '/uploads/default-article.jpg',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        featured: data.featured || false,
        body: data.body || content,
        meta_title: data.meta_title || data.title,
        meta_description: data.meta_description || data.excerpt,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return posts;
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The slug of the blog post
 * @returns {Object|null} Blog post data or null if not found
 */
export function getBlogPostBySlug(slug) {
  const blogDir = path.join(contentDirectory, 'blog');
  const fullPath = path.join(blogDir, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    content,
    title: data.title || '',
    author: data.author || 'B13 Factory',
    date: data.date || new Date().toISOString(),
    category: data.category || 'uncategorized',
    image: data.image || '/uploads/default-article.jpg',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    featured: data.featured || false,
    body: data.body || content,
    meta_title: data.meta_title || data.title,
    meta_description: data.meta_description || data.excerpt,
  };
}

/**
 * Get all article categories
 * @returns {Array} Array of categories
 */
export function getAllArticleCategories() {
  const categoriesDir = path.join(contentDirectory, 'article-categories');
  
  if (!fs.existsSync(categoriesDir)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(categoriesDir);
  
  const categories = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoriesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        name: data.name || '',
        description: data.description || '',
        color: data.color || 'blue',
        icon: data.icon || 'FolderOpen',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  
  return categories;
}

/**
 * Get blog posts by category
 * @param {string} categorySlug - The category slug
 * @returns {Array} Array of blog posts in the category
 */
export function getBlogPostsByCategory(categorySlug) {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.category === categorySlug);
}


/**
 * Get related blog posts (same category, excluding current post)
 * @param {string} currentSlug - Current post slug
 * @param {string} category - Category of current post
 * @param {number} limit - Number of related posts to return
 * @returns {Array} Array of related posts
 */
export function getRelatedBlogPosts(currentSlug, category, limit = 3) {
  const allPosts = getAllBlogPosts();
  return allPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

/**
 * Search blog posts by title or excerpt
 * @param {string} query - Search query
 * @returns {Array} Array of matching blog posts
 */
export function searchBlogPosts(query) {
  const allPosts = getAllBlogPosts();
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.item?.toLowerCase().includes(lowerQuery))
  );
}

