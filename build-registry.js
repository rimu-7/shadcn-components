import path from "path";
import fs from "fs"

// 1. Define paths
const COMPONENT_NAME = "github-heatmap";
const REGISTRY_PATH = path.join(process.cwd(), "registry2/new-york/components");
const OUTPUT_PATH = path.join(process.cwd(), "public/registry");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

async function buildRegistry() {
  console.log(`Building registry for ${COMPONENT_NAME}...`);

  // 2. Read the source TSX file
  const sourcePath = path.join(REGISTRY_PATH, `${COMPONENT_NAME}.tsx`);
  const sourceCode = fs.readFileSync(sourcePath, "utf8");

  // 3. Define the Registry JSON structure
  const registryItem = {
    name: COMPONENT_NAME,
    type: "registry:ui",
    dependencies: [
      "react-activity-calendar",
      "lucide-react",
      "date-fns",
      "next-themes"
    ],
    registryDependencies: [
      "card",
      "skeleton",
      "alert",
      "button",
      "tooltip"
    ],
    files: [
      {
        path: `components/${COMPONENT_NAME}.tsx`,
        content: sourceCode, // <--- This injects the code!
        type: "registry:ui",
        target: `components/${COMPONENT_NAME}.tsx`
      }
    ]
  };

  // 4. Write the final JSON to the public folder
  const outputPath = path.join(OUTPUT_PATH, `${COMPONENT_NAME}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(registryItem, null, 2));

  console.log(`✅ Registry file created at: ${outputPath}`);
}

buildRegistry();