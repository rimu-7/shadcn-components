# rimu-7/shadcn-components

Custom shadcn/ui components for React/Next.js projects.

## 🚀 Quick Install

Choose your preferred method:

### Method 1: Direct Install (Universal)
Works in any project without configuration:

```bash
# Text Writing Effect
npx shadcn@latest add text-writing-effect -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json

# GitHub Heatmap  
npx shadcn@latest add github-heatmap -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json

# GitHub Stars
npx shadcn@latest add github-stars -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json
```

### Method 2: Scoped Install
Use `@rimu-7/` prefix:

```bash
npx shadcn@latest add @rimu-7/text-writing-effect -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/scoped.json
```

### Method 3: Registry Init (Recommended)
Initialize once, install freely:

```bash
# Step 1: Add registry to your project
npx shadcn@latest init -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json

# Step 2: Install components (no -r flag needed!)
npx shadcn@latest add text-writing-effect
npx shadcn@latest add github-heatmap
```

### Method 4: Manual Config
Add to your `components.json`:

```json
{
  "registries": {
    "rimu-7": "https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json"
  }
}
```

Then install:
```bash
npx shadcn@latest add text-writing-effect@rimu-7
```

---

## 📦 Available Components

| Component | Version | Description | Install |
|-----------|---------|-------------|---------|
| **github-heatmap** | v1.0.0 | GitHub-style contribution graph with activity calendar | `npx shadcn@latest add github-heatmap -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json` |
| **text-writing-effect** | v2.0.0 | Beautiful SVG text animations with 9 different styles | `npx shadcn@latest add text-writing-effect -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json` |
| **github-stars** | v1.0.0 | Display GitHub repository stars with animated counter | `npx shadcn@latest add github-stars -r https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json` |

---

## 🔗 Registry URLs

- **Main Registry**: `https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/index.json`
- **Scoped Registry**: `https://raw.githubusercontent.com/rimu-7/shadcn-components/main/public/registry/scoped.json`
- **GitHub Repo**: `https://github.com/rimu-7/shadcn-components`

---

## 🛠️ Requirements

- Next.js 14+ or React 18+
- Tailwind CSS
- shadcn/ui initialized project

---

## 📄 License

MIT © [rimu-7](https://github.com/rimu-7)
