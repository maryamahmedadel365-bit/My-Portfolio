// Turns a raw URL from the Excel "Photos/ videos" column into a typed media item.

const YT = /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
const DRIVE = /drive\.google\.com\/file\/d\/([\w-]+)/;

// Cloudinary: ask for an optimised, resized copy (smaller on mobile data).
const optimise = (url, w = 900) =>
  url.includes("res.cloudinary.com") && url.includes("/image/upload/")
    ? url.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${w}/`)
    : url;

export function toMediaItem(url) {
  const yt = url.match(YT);
  if (yt) {
    return {
      type: "video",
      embed: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`,
      thumb: `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`,
      source: "YouTube",
    };
  }
  const drive = url.match(DRIVE);
  if (drive) {
    return {
      type: "video",
      embed: `https://drive.google.com/file/d/${drive[1]}/preview`,
      thumb: `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w900`,
      source: "Google Drive",
    };
  }
  return { type: "image", src: optimise(url), thumb: optimise(url, 240) };
}

export const toMediaList = (urls = []) => urls.map(toMediaItem);

// Picture used for the card cover: first photo, else first video poster.
export const coverOf = (items = []) => {
  const first = items.find((m) => m.type === "image") || items[0];
  if (!first) return "";
  return first.type === "image" ? first.src : first.thumb;
};

// "4 photos · 1 video"
export function mediaSummary(items = []) {
  const photos = items.filter((m) => m.type === "image").length;
  const videos = items.length - photos;
  const parts = [];
  if (photos) parts.push(`${photos} photo${photos > 1 ? "s" : ""}`);
  if (videos) parts.push(`${videos} video${videos > 1 ? "s" : ""}`);
  return parts.join(" · ");
}