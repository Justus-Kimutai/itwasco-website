import type { APIRoute } from "astro";
import { getPublishedPosts } from "../lib/supabase";

const SITE_URL = "https://itwasco.or.ke";

const staticPaths = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/services", priority: "0.8" },
  { path: "/blog", priority: "0.7" },
  { path: "/tenders", priority: "0.6" },
  { path: "/careers", priority: "0.6" },
  { path: "/strategic-plan", priority: "0.6" },
  { path: "/contact", priority: "0.7" },
];

function urlEntry(loc: string, priority: string, lastmod?: string) {
  return `  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>\n    ` : ""}<priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const staticEntries = staticPaths.map((p) => urlEntry(`${SITE_URL}${p.path}`, p.priority));

  const blogEntries = posts.map((post) =>
    urlEntry(`${SITE_URL}/blog/${post.slug}`, "0.6", post.updated_at || post.created_at)
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
};
