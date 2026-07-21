import { execFile } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const themeDirectory = join(scriptDirectory, "..");
const templatePath = join(themeDirectory, "src", "theme.template.css");
const outputPath = join(themeDirectory, "theme.css");
const execFileAsync = promisify(execFile);
const wallpaperQuality = 30;
const maximumThemeSize = 380 * 1024;

const wallpapers = [
  ["__HAZE_WALLPAPER_DESERT__", "03_沙漠黄昏_4K.jpg"],
  ["__HAZE_WALLPAPER_BLUE__", "02_蓝紫暮色_4K.jpg"],
  ["__HAZE_WALLPAPER_PAPER__", "05_暖纸中性色_4K.jpg"],
  ["__HAZE_WALLPAPER_GRAPHITE__", "06_石墨灰_4K.jpg"]
];

let output = await readFile(templatePath, "utf8");

for (const [token, filename] of wallpapers) {
  if (!output.includes(token)) {
    throw new Error(`Theme template is missing ${token}.`);
  }

  const sourcePath = join(themeDirectory, "assets", "wallpapers", filename);
  const webpPath = join(themeDirectory, "assets", "wallpapers", `.${filename}.q${wallpaperQuality}.webp`);

  try {
    await execFileAsync("cwebp", ["-quiet", "-q", String(wallpaperQuality), sourcePath, "-o", webpPath]);
    const wallpaper = await readFile(webpPath);
    const dataUri = `data:image/webp;base64,${wallpaper.toString("base64")}`;
    output = output.replaceAll(token, dataUri);
  } finally {
    await rm(webpPath, { force: true });
  }
}

if (output.includes("__HAZE_WALLPAPER_")) {
  throw new Error("Theme template contains an unprocessed wallpaper token.");
}

const outputSize = Buffer.byteLength(output, "utf8");
if (outputSize > maximumThemeSize) {
  throw new Error(`Theme CSS is ${outputSize} bytes; limit is ${maximumThemeSize} bytes.`);
}

await writeFile(outputPath, output, "utf8");

console.log(`Built ${outputPath} with four embedded 4K WebP wallpapers (${outputSize} bytes).`);
