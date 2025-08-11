# migrate-to-lodash-es

[![npm version](https://img.shields.io/npm/v/migrate-to-lodash-es.svg)](https://www.npmjs.com/package/migrate-to-lodash-es)

**Easily migrate your JavaScript/TypeScript imports from [`lodash`](https://lodash.com) to [`lodash-es`](https://www.npmjs.com/package/lodash-es)** in seconds.

This CLI tool scans your project files and rewrites:

```js
// Before
import { isEmpty, omitBy, pickBy, without } from 'lodash'
```

into:

```js
// After
import isEmpty from 'lodash-es/isEmpty'
import omitBy from 'lodash-es/omitBy'
import pickBy from 'lodash-es/pickBy'
import without from 'lodash-es/without'
```

## ✨ Features

- Recursively scans directories
- Works on `.js`, `.ts`, `.tsx` files
- Supports both named and single imports
- Can migrate **entire projects** or **a single file**
- Keeps all other code intact

---

## 📦 Installation

```bash
npm install -g migrate-to-lodash-es
```

---

## 🚀 Usage

### Migrate a whole project
```bash
migrate-to-lodash-es ./src
```

### Migrate a single file
```bash
migrate-to-lodash-es src/pages/component/component.tsx
```

---

## 💡 Example

**Before**
```js
import { isEmpty, omitBy } from 'lodash'
import without from 'lodash'
```

**After**
```js
import isEmpty from 'lodash-es/isEmpty'
import omitBy from 'lodash-es/omitBy'
import without from 'lodash-es/without'
```

---

## ⚙️ Options (coming soon)

- `--dry-run` → Show what would change without modifying files
- `--backup` → Save `.bak` files before migration

---

## 📂 Supported File Types
- `.js`
- `.jsx`
- `.ts`
- `.tsx`

---

## 🛠 How it works

The tool:
1. Reads your file(s)
2. Finds imports from `lodash`
3. Converts them into individual ESM imports from `lodash-es`
4. Writes the changes in place

---

## 📝 License
MIT © [Petros Demetriou](https://github.com/petrosD93)
