#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Please specify a target file or directory to migrate.')
  process.exit(1)
}

const targetPath = args[0]

// Convert lodash imports to lodash-es imports
function convertLodashImport(content) {
  let changed = false

  // Named imports
  content = content.replace(
      /import\s*\{([^}]+)\}\s*from\s*['"]lodash['"];?/g,
      (_, imports) => {
        changed = true
        const names = imports.split(',').map(name => name.trim()).filter(Boolean)
        return names
            .map(name => `import ${name} from 'lodash-es/${name}'`)
            .join('\n')
      }
  )

  // Default single imports
  content = content.replace(
      /import\s+(\w+)\s+from\s+['"]lodash['"];?/g,
      (_, singleImport) => {
        changed = true
        return `import ${singleImport} from 'lodash-es/${singleImport}'`
      }
  )

  return { content, changed }
}

// Get all files recursively
function getFiles(dir, exts = ['.js', '.jsx', '.ts', '.tsx']) {
  let results = []
  const list = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of list) {
    const fullPath = path.join(dir, file.name)
    if (file.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts))
    } else {
      if (exts.includes(path.extname(file.name))) {
        results.push(fullPath)
      }
    }
  }
  return results
}

// Migrate a single file
function migrateFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')
  const { content, changed } = convertLodashImport(original)
  if (changed) {
    fs.writeFileSync(filePath, content)
    console.log(`Updated: ${filePath}`)
    return 1
  }
  return 0
}

// Main migration function
function migrate(target) {
  let filesChanged = 0

  if (!fs.existsSync(target)) {
    console.error(`Path does not exist: ${target}`)
    process.exit(1)
  }

  const stats = fs.statSync(target)
  if (stats.isDirectory()) {
    const files = getFiles(target)
    for (const file of files) {
      filesChanged += migrateFile(file)
    }
  } else if (stats.isFile()) {
    const ext = path.extname(target)
    if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
      filesChanged += migrateFile(target)
    } else {
      console.warn(`Skipping non-JS/TS file: ${target}`)
    }
  }

  console.log(`\nMigration complete. ${filesChanged} file(s) updated.`)
}

migrate(targetPath)
