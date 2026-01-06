import path from "path";
import fs from "fs";

// Configuration for all your components
const COMPONENTS = [
  {
    name: "github-heatmap",
    dependencies: [
      "react-activity-calendar",
      "lucide-react",
      "date-fns",
      "next-themes",
    ],
    registryDependencies: ["card", "skeleton", "alert", "button", "tooltip"],
  },
  {
    name: "text-writing-effect",
    dependencies: ["framer-motion"],
    registryDependencies: [],
  },
];

// Paths
const REGISTRY_PATH = path.join(process.cwd(), "registry/components");
const OUTPUT_PATH = path.join(process.cwd(), "public/registry");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

async function buildRegistry() {
  console.log("🚀 Starting registry build...");

  for (const component of COMPONENTS) {
    try {
      console.log(`Building ${component.name}...`);

      // 1. Read the source TSX file
      const sourcePath = path.join(REGISTRY_PATH, `${component.name}.tsx`);

      if (!fs.existsSync(sourcePath)) {
        console.error(`❌ Source file not found: ${sourcePath}`);
        continue;
      }

      const sourceCode = fs.readFileSync(sourcePath, "utf8");

      // 2. Define the Registry JSON structure
      const registryItem = {
        name: component.name,
        type: "registry:ui",
        dependencies: component.dependencies,
        registryDependencies: component.registryDependencies,
        files: [
          {
            path: `components/ui/${component.name}.tsx`,
            content: sourceCode,
            type: "registry:ui",
            target: `components/ui/${component.name}.tsx`,
          },
        ],
      };

      // 3. Write the final JSON to the public folder
      const outputPath = path.join(OUTPUT_PATH, `${component.name}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(registryItem, null, 2));

      console.log(`✅ Created: ${component.name}.json`);
    } catch (error) {
      console.error(`❌ Error building ${component.name}:`, error);
    }
  }

  console.log("✨ Build complete!");
}

buildRegistry();
