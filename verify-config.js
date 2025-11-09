#!/usr/bin/env node

/**
 * Script untuk verifikasi konfigurasi B13 Factory Website
 * Memeriksa semua file dan settings yang diperlukan
 */

const fs = require('fs');
const path = require('path');

console.log(`🔍 B13 Factory - Configuration Verification Tool`);
console.log('='.repeat(60));

let errors = [];
let warnings = [];
let success = [];

// 1. Check if required directories exist
console.log(`
📁 Checking Directory Structure...
`);

const requiredDirs = [
  'content',
  'content/home',
  'content/products',
  'content/portfolio',
  'content/product-categories',
  'content/portfolio-categories',
  'public',
  'public/admin',
  'public/uploads',
  'src',
];

requiredDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    success.push(`✅ Directory exists: ${dir}`);
  } else {
    errors.push(`❌ Missing directory: ${dir}`);
  }
});

// 2. Check if required files exist
console.log(`
📄 Checking Required Files...
`);

const requiredFiles = [
  'public/admin/config.yml',
  'public/admin/index.html',
  'netlify.toml',
  'next.config.js',
  'package.json',
  'content/home/home.md',
];

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    success.push(`✅ File exists: ${file}`);
  } else {
    errors.push(`❌ Missing file: ${file}`);
  }
});

// 3. Check config.yml settings
console.log(`
⚙️  Checking config.yml Settings...
`);

const configPath = path.join(process.cwd(), 'public/admin/config.yml');
if (fs.existsSync(configPath)) {
  const configContent = fs.readFileSync(configPath, 'utf-8');

  // Check backend
  if (configContent.includes('name: git-gateway')) {
    success.push('✅ Backend: git-gateway configured');
  } else {
    errors.push('❌ Backend: git-gateway NOT configured');
  }

  // Check site URL
  if (configContent.includes('https://b13factory-garment.netlify.app')) {
    success.push('✅ Site URL: Correct (b13factory-garment.netlify.app)');
  } else if (configContent.includes('b13factory-garmentadv.netlify.app')) {
    warnings.push('⚠️  Site URL: Using OLD URL (b13factory-garmentadv)');
  } else {
    warnings.push('⚠️  Site URL: Not found or incorrect');
  }

  // Check collections
  const collections = ['config', 'home', 'products', 'portfolio', 'blog'];
  collections.forEach(col => {
    if (configContent.includes(`name: "${col}"`)) {
      success.push(`✅ Collection configured: ${col}`);
    }
  });
}

// 4. Check netlify.toml settings
console.log(`
🌐 Checking netlify.toml Settings...
`);

const tomlPath = path.join(process.cwd(), 'netlify.toml');
if (fs.existsSync(tomlPath)) {
  const tomlContent = fs.readFileSync(tomlPath, 'utf-8');

  if (tomlContent.includes('command = "npm run build"')) {
    success.push('✅ Build command: npm run build');
  } else {
    warnings.push('⚠️  Build command: Not standard');
  }

  if (tomlContent.includes('publish = ".next"')) {
    success.push('✅ Publish directory: .next');
  } else {
    errors.push('❌ Publish directory: Not set to .next');
  }

  if (tomlContent.includes('https://b13factory-garment.netlify.app')) {
    success.push('✅ Netlify URL: Correct');
  } else if (tomlContent.includes('b13factory-garmentadv.netlify.app')) {
    warnings.push('⚠️  Netlify URL: Using OLD URL');
  }
}

// 5. Check content files
console.log(`
📝 Checking Content Files...
`);

const contentDirs = [
  'content/products',
  'content/portfolio',
  'content/product-categories',
  'content/portfolio-categories',
];

contentDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    if (files.length > 0) {
      success.push(`✅ ${dir}: ${files.length} content file(s)`);
    } else {
      warnings.push(`⚠️  ${dir}: No content files found`);
    }
  }
});

// 6. Check upload directory
console.log(`
🖼️  Checking Upload Directory...
`);

const uploadsPath = path.join(process.cwd(), 'public/uploads');
if (fs.existsSync(uploadsPath)) {
  const files = fs.readdirSync(uploadsPath);
  const imageFiles = files.filter(f =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)
  );
  if (imageFiles.length > 0) {
    success.push(`✅ Uploads: ${imageFiles.length} image file(s)`);
  } else {
    warnings.push('⚠️  Uploads: No images found');
  }
}

// 7. Check package.json dependencies
console.log(`
📦 Checking Dependencies...
`);

const pkgPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  const requiredDeps = ['next', 'react', 'react-dom', 'gray-matter'];
  requiredDeps.forEach(dep => {
    if (pkg.dependencies && pkg.dependencies[dep]) {
      success.push(`✅ Dependency: ${dep} (${pkg.dependencies[dep]})`);
    } else {
      errors.push(`❌ Missing dependency: ${dep}`);
    }
  });
}

// Print Results
console.log(`
` + '='.repeat(60));
console.log(`
📊 VERIFICATION RESULTS
`);

if (success.length > 0) {
  console.log(`✅ SUCCESS (${success.length})`);
  success.forEach(msg => console.log('  ' + msg));
}

if (warnings.length > 0) {
  console.log(`
⚠️  WARNINGS (${warnings.length})`);
  warnings.forEach(msg => console.log('  ' + msg));
}

if (errors.length > 0) {
  console.log(`
❌ ERRORS (${errors.length})`);
  errors.forEach(msg => console.log('  ' + msg));
}

// Summary
console.log(`
` + '='.repeat(60));
console.log(`
📋 SUMMARY
`);

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed! Configuration looks good.');
  console.log(`
🚀 Next steps:
1. Ensure Netlify Identity is enabled
2. Ensure Git Gateway is enabled
3. Invite users to access CMS
4. Deploy your site`);
} else if (errors.length === 0) {
  console.log('⚠️  Configuration has some warnings but should work.');
  console.log('Consider fixing warnings for better performance.');
} else {
  console.log('❌ Configuration has errors that need to be fixed.');
  console.log('Please address the errors above before deploying.');
  process.exit(1);
}

console.log(`
📚 Documentation:
- Setup Guide: CMS-SETUP.md
- Troubleshooting: TROUBLESHOOTING-ID.md
- Fix Guide: fix-repository.md
`);
