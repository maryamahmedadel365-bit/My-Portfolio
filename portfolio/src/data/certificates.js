import * as XLSX from "xlsx";

// Portfolio_2.xlsx must be inside your /public folder
const FILE = "/Portfolio_2.xlsx";
const CERT_SHEET = "Sheet 1";   // Name | Place | Summary | Key points | Photo Link | ... | Category 2
const BADGE_SHEET = "Sheet 3";  // Name | Issuer | Description | Photo (credly link)
const BADGE_CATEGORY = "Badges";

const clean = (v) => (typeof v === "string" ? v.trim() : v ?? "");

// "Key points" cell -> array of bullets (one per line)
function parsePoints(text = "") {
  return String(text)
    .split(/\r?\n/)
    .map((s) => s.replace(/^[\s•\-–*\t]+/, "").trim())
    .filter(Boolean);
}

const isImage = (url = "") =>
  /res\.cloudinary\.com|\.(png|jpe?g|webp|gif)(\?|$)/i.test(url);

// trim header names ("Photo Link " -> "Photo Link")
const trimKeys = (raw) =>
  Object.fromEntries(Object.entries(raw).map(([k, v]) => [k.trim(), clean(v)]));

function readRows(wb, sheetName) {
  const ws = wb.Sheets[sheetName];
  if (!ws) return [];
  // row 1 = "Table 1" label, headers on row 2
  return XLSX.utils.sheet_to_json(ws, { range: 1, defval: "" }).map(trimKeys);
}

export async function loadCertificates() {
  const res = await fetch(FILE);
  if (!res.ok) throw new Error(`Could not load ${FILE}`);
  const wb = XLSX.read(await res.arrayBuffer(), { type: "array" });

  const items = [];

  // Sheet 1 (rows without a Name are the "AI / Programming / Others" label rows -> skipped)
  readRows(wb, CERT_SHEET).forEach((r) => {
    if (!r.Name) return;
    const link = r["Photo Link"];
    items.push({
      name: r.Name,
      issuer: r.Place,
      summary: r.Summary,
      points: parsePoints(r["Key points"]),
      image: isImage(link) ? link : "",
      link,
      category: r["Category 2"] || "Others",
    });
  });

  // Sheet 3 = badges
  readRows(wb, BADGE_SHEET).forEach((r) => {
    if (!r.Name) return;
    items.push({
      name: r.Name,
      issuer: r.Issuer,
      summary: r.Description,
      points: [],
      image: isImage(r.Photo) ? r.Photo : "",
      link: r.Photo,
      category: BADGE_CATEGORY,
    });
  });

  // group by category, in the order they first appear
  const map = new Map();
  items.forEach((it) => {
    if (!map.has(it.category)) map.set(it.category, []);
    map.get(it.category).push(it);
  });

  return {
    total: items.length,
    categories: [...map].map(([name, list]) => ({ name, items: list })),
  };
}
