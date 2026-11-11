import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "images");

const palette = {
  black: "#0B0B0B",
  green: "#1E6B1E",
  greenDark: "#145014",
  light: "#F4F4F2",
  gray: "#2A2A2A",
  amber: "#F5A300",
  white: "#FFFFFF",
};

const categories = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/categories.json"), "utf8"),
);
const products = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/products.json"), "utf8"),
);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function speedLines(width, height, color, opacity = 0.16) {
  return Array.from({ length: 7 })
    .map((_, index) => {
      const y = height * 0.16 + index * (height * 0.1);
      const length = width * (0.24 + (index % 3) * 0.12);
      return `<rect x="${width - length - width * 0.06}" y="${y}" width="${length}" height="${Math.max(2, height * 0.006)}" fill="${color}" opacity="${opacity}" transform="skewX(-18)" />`;
    })
    .join("");
}

function tirePattern(width, height, color, opacity = 0.08) {
  const blocks = [];
  const step = Math.round(width / 18);
  for (let x = -height; x < width + height; x += step) {
    blocks.push(
      `<rect x="${x}" y="0" width="${Math.max(6, step * 0.28)}" height="${height}" fill="${color}" opacity="${opacity}" transform="rotate(18 ${x} 0)" />`,
    );
  }
  return blocks.join("");
}

function iconFor(categorySlug, size, color) {
  const c = size / 2;
  const r = size * 0.3;
  switch (categorySlug) {
    case "cauchos":
      return `<g fill="none" stroke="${color}" stroke-width="${size * 0.045}">
        <circle cx="${c}" cy="${c}" r="${r}" />
        <circle cx="${c}" cy="${c}" r="${r * 0.62}" opacity="0.7" />
        <circle cx="${c}" cy="${c}" r="${r * 0.24}" fill="${color}" stroke="none" />
      </g>`;
    case "cascos":
      return `<g fill="none" stroke="${color}" stroke-width="${size * 0.045}" stroke-linejoin="round">
        <path d="M ${c - r} ${c + r * 0.55} A ${r} ${r} 0 0 1 ${c + r} ${c + r * 0.55} L ${c + r} ${c + r * 0.8} L ${c - r} ${c + r * 0.8} Z" />
        <path d="M ${c - r * 0.75} ${c + r * 0.1} L ${c + r * 0.75} ${c + r * 0.1}" opacity="0.6" />
      </g>`;
    case "baterias":
      return `<g fill="none" stroke="${color}" stroke-width="${size * 0.045}" stroke-linejoin="round">
        <rect x="${c - r * 0.85}" y="${c - r * 0.6}" width="${r * 1.7}" height="${r * 1.2}" />
        <path d="M ${c - r * 0.35} ${c - r * 0.85} L ${c - r * 0.1} ${c - r * 0.85} M ${c + r * 0.1} ${c - r * 0.85} L ${c + r * 0.35} ${c - r * 0.85}" />
        <path d="M ${c - r * 0.4} ${c} L ${c + r * 0.4} ${c}" opacity="0.7" />
      </g>`;
    case "carroceria":
      return `<g fill="none" stroke="${color}" stroke-width="${size * 0.045}" stroke-linejoin="round">
        <path d="M ${c - r} ${c + r * 0.55} L ${c - r * 0.55} ${c - r * 0.55} L ${c + r * 0.35} ${c - r * 0.75} L ${c + r} ${c + r * 0.1} L ${c + r * 0.55} ${c + r * 0.7} Z" />
      </g>`;
    case "accesorios":
      return `<g fill="none" stroke="${color}" stroke-width="${size * 0.045}" stroke-linejoin="round">
        <rect x="${c - r * 0.85}" y="${c - r * 0.55}" width="${r * 1.7}" height="${r * 1.1}" rx="${r * 0.2}" />
        <path d="M ${c - r * 0.35} ${c + r * 0.55} L ${c - r * 0.35} ${c + r * 0.95} M ${c + r * 0.35} ${c + r * 0.55} L ${c + r * 0.35} ${c + r * 0.95}" />
      </g>`;
    default:
      return `<g fill="none" stroke="${color}" stroke-width="${size * 0.045}">
        <circle cx="${c}" cy="${c}" r="${r}" />
        <circle cx="${c}" cy="${c}" r="${r * 0.55}" opacity="0.65" />
        <path d="M ${c} ${c - r * 1.15} L ${c} ${c + r * 1.15} M ${c - r * 1.15} ${c} L ${c + r * 1.15} ${c}" opacity="0.5" />
      </g>`;
  }
}

function frameSvg(width, height, { label, title, subtitle, categorySlug }) {
  const padding = Math.round(width * 0.07);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.black}" />
    ${tirePattern(width, height, palette.white, 0.035)}
    <polygon points="0,0 ${width * 0.42},0 ${width * 0.28},${height} 0,${height}" fill="${palette.green}" opacity="0.92" />
    <polygon points="${width * 0.42},0 ${width * 0.52},0 ${width * 0.38},${height} ${width * 0.28},${height}" fill="${palette.amber}" opacity="0.9" />
    <polygon points="${width * 0.86},${height * 0.1} ${width},${height * 0.02} ${width},${height * 0.22}" fill="${palette.green}" opacity="0.5" />
    ${speedLines(width, height, palette.white, 0.12)}
    <g transform="translate(${width * 0.56}, ${height * 0.2})">
      ${iconFor(categorySlug, Math.min(width, height) * 0.34, palette.light)}
    </g>
    <text x="${padding}" y="${height - padding * 1.6}" fill="${palette.amber}" font-family="DejaVu Sans, Arial, sans-serif" font-size="${Math.round(width * 0.028)}" font-weight="700" letter-spacing="${Math.round(width * 0.004)}">${escapeXml(label)}</text>
    <text x="${padding}" y="${height - padding * 0.85}" fill="${palette.white}" font-family="DejaVu Sans, Arial, sans-serif" font-size="${Math.round(width * 0.062)}" font-weight="800">${escapeXml(title)}</text>
    <text x="${padding}" y="${height - padding * 0.35}" fill="${palette.light}" opacity="0.75" font-family="DejaVu Sans, Arial, sans-serif" font-size="${Math.round(width * 0.026)}">${escapeXml(subtitle)}</text>
  </svg>`;
}

function productSvg(product) {
  const width = 1000;
  const height = 1000;
  const padding = 70;
  const category = categories.find((item) => item.slug === product.categorySlug);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.light}" />
    <rect x="0" y="0" width="${width}" height="${height}" fill="${palette.white}" opacity="0.35" />
    ${tirePattern(width, height, palette.black, 0.025)}
    <polygon points="${width},0 ${width},${height * 0.32} ${width * 0.72},0" fill="${palette.green}" opacity="0.14" />
    <polygon points="0,${height} 0,${height * 0.8} ${width * 0.2},${height}" fill="${palette.amber}" opacity="0.25" />
    <circle cx="${width * 0.78}" cy="${height * 0.24}" r="${width * 0.24}" fill="${palette.green}" opacity="0.08" />
    <g transform="translate(${width * 0.27}, ${height * 0.14})">
      ${iconFor(product.categorySlug, width * 0.46, palette.gray)}
    </g>
    <rect x="${padding}" y="${height - 168}" width="${width - padding * 2}" height="4" fill="${palette.green}" opacity="0.35" />
    <text x="${padding}" y="${height - 118}" fill="${palette.green}" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3">${escapeXml((category?.name ?? "PRODUCTO").toUpperCase())} · MUESTRA</text>
    <text x="${padding}" y="${height - 66}" fill="${palette.black}" font-family="DejaVu Sans, Arial, sans-serif" font-size="38" font-weight="800">${escapeXml(product.reference)}</text>
  </svg>`;
}

function heroSvg() {
  const width = 1600;
  const height = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.black}" />
    ${tirePattern(width, height, palette.white, 0.045)}
    <polygon points="0,${height} 0,${height * 0.48} ${width * 0.52},${height}" fill="${palette.green}" opacity="0.9" />
    <polygon points="${width * 0.44},${height} ${width * 0.6},${height} ${width * 0.52},${height * 0.48}" fill="${palette.amber}" opacity="0.92" />
    <polygon points="${width * 0.62},0 ${width},0 ${width},${height * 0.5}" fill="${palette.green}" opacity="0.18" />
    ${speedLines(width, height, palette.white, 0.18)}
    <g transform="translate(${width * 0.66}, ${height * 0.2})">
      ${iconFor("cauchos", width * 0.24, palette.light)}
    </g>
    <text x="90" y="${height * 0.34}" fill="${palette.amber}" font-family="DejaVu Sans, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="10">DISTRIBUCIÓN AL MAYOR · VENEZUELA</text>
    <text x="86" y="${height * 0.55}" fill="${palette.white}" font-family="DejaVu Sans, Arial, sans-serif" font-size="150" font-weight="900" font-style="italic">VTR IMPORT</text>
    <text x="90" y="${height * 0.68}" fill="${palette.light}" opacity="0.86" font-family="DejaVu Sans, Arial, sans-serif" font-size="42" font-weight="600">Repuestos · Cauchos · Cascos · Accesorios</text>
    <text x="90" y="${height * 0.78}" fill="${palette.light}" opacity="0.6" font-family="DejaVu Sans, Arial, sans-serif" font-size="26">Imagen de demostración generada localmente. Reemplazar por fotografía real.</text>
  </svg>`;
}

function aboutSvg() {
  const width = 1200;
  const height = 800;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.gray}" />
    ${tirePattern(width, height, palette.white, 0.03)}
    <rect x="70" y="150" width="1060" height="520" fill="${palette.black}" opacity="0.35" />
    ${[0, 1, 2].map((row) =>
      [0, 1, 2, 3, 4, 5].map((col) => {
        const x = 110 + col * 165;
        const y = 200 + row * 155;
        const fill = (row + col) % 3 === 0 ? palette.green : palette.light;
        const opacity = (row + col) % 3 === 0 ? 0.85 : 0.14;
        return `<rect x="${x}" y="${y}" width="125" height="110" fill="${fill}" opacity="${opacity}" />`;
      }).join(""),
    ).join("")}
    <polygon points="0,${height} 0,${height * 0.72} ${width * 0.3},${height}" fill="${palette.green}" opacity="0.95" />
    <polygon points="${width * 0.24},${height} ${width * 0.34},${height} ${width * 0.3},${height * 0.72}" fill="${palette.amber}" opacity="0.95" />
    <text x="70" y="${height - 52}" fill="${palette.white}" font-family="DejaVu Sans, Arial, sans-serif" font-size="46" font-weight="800" font-style="italic">LOGÍSTICA Y MAYOREO</text>
    <text x="70" y="${height - 20}" fill="${palette.light}" opacity="0.7" font-family="DejaVu Sans, Arial, sans-serif" font-size="22">Imagen de demostración. Reemplazar por fotografía real del almacén.</text>
  </svg>`;
}

function blogSvg(title, index) {
  const width = 1200;
  const height = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.black}" />
    ${tirePattern(width, height, palette.white, 0.04)}
    <polygon points="0,${height} 0,${height * 0.5} ${width * 0.4},${height}" fill="${index % 2 === 0 ? palette.green : palette.gray}" opacity="0.95" />
    <polygon points="${width * 0.33},${height} ${width * 0.44},${height} ${width * 0.4},${height * 0.5}" fill="${palette.amber}" opacity="0.9" />
    ${speedLines(width, height, palette.white, 0.16)}
    <text x="70" y="120" fill="${palette.amber}" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="8">BLOG · CONTENIDO DE EJEMPLO</text>
    <text x="70" y="${height * 0.56}" fill="${palette.white}" font-family="DejaVu Sans, Arial, sans-serif" font-size="58" font-weight="800">${escapeXml(title)}</text>
    <text x="70" y="${height - 70}" fill="${palette.light}" opacity="0.65" font-family="DejaVu Sans, Arial, sans-serif" font-size="22">Imagen de demostración generada localmente.</text>
  </svg>`;
}

async function writeWebp(svg, outputPath, width, height) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .webp({ quality: 82 })
    .toFile(outputPath);
  console.log(`✓ ${path.relative(root, outputPath)}`);
}

async function main() {
  await writeWebp(heroSvg(), path.join(imagesDir, "hero.webp"), 1600, 900);
  await writeWebp(aboutSvg(), path.join(imagesDir, "nosotros.webp"), 1200, 800);

  for (const category of categories) {
    const svg = frameSvg(800, 600, {
      label: "CATEGORÍA · MUESTRA",
      title: category.name,
      subtitle: category.tagline,
      categorySlug: category.slug,
    });
    await writeWebp(
      svg,
      path.join(publicDir, category.image.replace(/^\//, "")),
      800,
      600,
    );
  }

  for (const product of products) {
    const output = path.join(publicDir, product.image.replace(/^\//, ""));
    await writeWebp(productSvg(product), output, 1000, 1000);
  }

  const blogTitles = [
    "Cómo surtir tu repuestera",
    "Cauchos: rotación y margen",
  ];
  for (let index = 0; index < blogTitles.length; index += 1) {
    await writeWebp(
      blogSvg(blogTitles[index], index),
      path.join(imagesDir, "blog", `articulo-${index + 1}.webp`),
      1200,
      630,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
