const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.name === ".git") return [];
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const errors = [];

if (htmlFiles.length !== 35) {
  errors.push(`Expected 35 HTML files including the homepage and 404 page, found ${htmlFiles.length}.`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);

  if (!html.includes("<title>")) errors.push(`${relative}: missing title`);
  if (!html.includes('name="description"')) errors.push(`${relative}: missing description`);

  if (relative !== "index.html") {
    if (!html.includes('name="robots" content="noindex, nofollow"')) {
      errors.push(`${relative}: draft subpage must remain noindex`);
    }
    if (!html.includes('href="/assets/styles.css"')) errors.push(`${relative}: missing shared stylesheet`);
    if (!html.includes('src="/assets/site.js"')) errors.push(`${relative}: missing shared script`);
  }

  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (!href.startsWith("/") || href === "/") continue;
    const cleanPath = href.split("#")[0].split("?")[0];
    if (!cleanPath) continue;
    const target = path.join(root, cleanPath.replace(/^\//, ""));
    const exists = path.extname(target)
      ? fs.existsSync(target)
      : fs.existsSync(path.join(target, "index.html"));
    if (!exists) errors.push(`${relative}: broken internal link ${href}`);
  }
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
const unpublishedRoutes = ["/services/", "/industries/", "/work/", "/insights/", "/about/", "/careers/", "/contact/"];
for (const route of unpublishedRoutes) {
  if (homepage.includes(`href="${route}"`)) {
    errors.push(`Homepage must not link to unpublished route ${route}`);
  }
}

for (const file of files) {
  if (fs.statSync(file).size > 2_000_000) continue;
  const content = fs.readFileSync(file, "utf8");
  if (/GHSA[T]0/.test(content)) {
    errors.push(`${path.relative(root, file)}: contains a tokenized GitHub URL`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files with no homepage links to draft subpages.`);
