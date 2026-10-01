import * as XLSX from "xlsx";

// Put Portfolio_2.xlsx inside your /public folder
const FILE = "/Portfolio_2.xlsx";
const SHEET = "Sheet 4";

// "Aug 2025-Sep2025" -> "Aug 2025 – Sep 2025"
function formatPeriod(p = "") {
  return String(p)
    .replace(/([A-Za-z]{3})(\d{4})/g, "$1 $2")
    .split(/\s*[-–]\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" – ");
}

// "EAEA — Egyptian Atomic Energy Authority" -> short + full name
function splitOrg(org = "") {
  const [short, ...rest] = String(org).split("—").map((s) => s.trim());
  return { orgShort: short, orgFull: rest.join(" — ") };
}

// "Summary...\nKey Points:\n- a\n- b" -> { desc, points }
function splitDesc(text = "") {
  const [desc, pts = ""] = String(text).split(/Key Points:/i);
  return {
    desc: desc.trim(),
    points: pts.split("\n").map((s) => s.trim()).filter(Boolean),
  };
}

export async function loadInternships() {
  const res = await fetch(FILE);
  if (!res.ok) throw new Error(`Could not load ${FILE}`);
  const wb = XLSX.read(await res.arrayBuffer(), { type: "array" });
  const ws = wb.Sheets[SHEET] || wb.Sheets[wb.SheetNames[wb.SheetNames.length - 1]];

  // row 1 is the "Table 1" label, headers are on row 2
  const rows = XLSX.utils.sheet_to_json(ws, { range: 1, defval: "" });

  const items = rows
    .map((raw) => {
      // trim header names ("Org " -> "Org")
      const r = Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k.trim(), typeof v === "string" ? v.trim() : v])
      );
      if (!r.Title && !r.Org) return null;
      return {
        title: r.Title,
        ...splitOrg(r.Org),
        period: formatPeriod(r.Period),
        ...splitDesc(r.Desc),
        icon: r.Icon || "",
        certificate: r["Link of certificate"] || "",
      };
    })
    .filter(Boolean);

  // last row in Excel = first in the timeline
  return items.reverse();
}
