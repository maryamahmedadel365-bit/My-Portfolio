import * as XLSX from "xlsx";

// Portfolio_2.xlsx must be inside your /public folder
const FILE = "/Portfolio_2.xlsx";
const PROJECT_SHEET = "Sheet 2"; // Name | Link github | Link | Description | Teammate | Tech stack | Achievements | Photos/ videos

const clean = (v) => (typeof v === "string" ? v.trim() : v ?? "");

// "Achievements" cell -> array of bullets (one per line)
function parseLines(text = "") {
  return String(text)
    .split(/\r?\n/)
    .map((s) => s.replace(/^[\s•\-–*\t]+/, "").trim())
    .filter(Boolean);
}

// "Python · YOLOv8 · OpenCV" or "Frontend: React\nBackend: Django" -> ["Python", ...]
function parseTech(text = "") {
  return String(text)
    .split(/[·\n,]/)
    .map((s) => s.replace(/^\s*(Frontend|Backend|Styling|Language|Hosting|Localization)\s*:\s*/i, "").trim())
    .filter(Boolean);
}

// "A - B - C" -> ["A","B","C"]; "Solo project" stays as is
function parseTeam(text = "") {
  const t = String(text).trim();
  if (!t) return [];
  if (/solo/i.test(t)) return ["Solo project"];
  return t.split(/\s+-\s+|\r?\n/).map((s) => s.trim()).filter(Boolean);
}

// "Photos/ videos" cell -> one URL per line
const parseUrls = (text = "") =>
  String(text)
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//i.test(s));

// trim header names ("Name " -> "Name")
const trimKeys = (raw) =>
  Object.fromEntries(Object.entries(raw).map(([k, v]) => [k.trim(), clean(v)]));

function readRows(wb, sheetName) {
  const ws = wb.Sheets[sheetName];
  if (!ws) return [];
  // row 1 = "Table 1" label, headers on row 2
  return XLSX.utils.sheet_to_json(ws, { range: 1, defval: "" }).map(trimKeys);
}

export async function loadProjects() {
  const res = await fetch(FILE);
  if (!res.ok) throw new Error(`Could not load ${FILE}`);
  const wb = XLSX.read(await res.arrayBuffer(), { type: "array" });

  return readRows(wb, PROJECT_SHEET)
    .filter((r) => r.Name)
    .map((r, i) => {
      const title = r.Name.replace(/^\d+\.\s*/, ""); // "2. Green-Loop" -> "Green-Loop"
      return {
        id: `${i}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title,
        github: r["Link github"],
        live: r.Link,
        description: String(r.Description).replace(/\s+/g, " ").trim(),
        team: parseTeam(r.Teammate),
        tech: parseTech(r["Tech stack"]),
        achievements: parseLines(r.Achievements),
        media: parseUrls(r["Photos/ videos"]),
      };
    });
}