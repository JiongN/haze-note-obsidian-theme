import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const themeDirectory = join(scriptDirectory, "..");
const templatePath = join(themeDirectory, "src", "theme.template.css");
const outputPath = join(themeDirectory, "theme.css");

const wallpapers = [
  ["__HAZE_WALLPAPER_DESERT__", "03_沙漠黄昏_4K.jpg"],
  ["__HAZE_WALLPAPER_PURPLE__", "01_紫色极光_4K.jpg"],
  ["__HAZE_WALLPAPER_BLUE__", "02_蓝紫暮色_4K.jpg"],
  ["__HAZE_WALLPAPER_LAVENDER__", "04_薰衣草薄雾_4K.jpg"],
  ["__HAZE_WALLPAPER_PAPER__", "05_暖纸中性色_4K.jpg"],
  ["__HAZE_WALLPAPER_GRAPHITE__", "06_石墨灰_4K.jpg"]
];

let output = await readFile(templatePath, "utf8");

for (const [token, filename] of wallpapers) {
  if (!output.includes(token)) {
    throw new Error(`Theme template is missing ${token}.`);
  }

  const wallpaper = await readFile(join(themeDirectory, "assets", "wallpapers", filename));
  const dataUri = `data:image/jpeg;base64,${wallpaper.toString("base64")}`;
  output = output.replaceAll(token, dataUri);
}

await writeFile(outputPath, output, "utf8");

console.log(`Built ${outputPath} with ${wallpapers.length} embedded wallpapers.`);
