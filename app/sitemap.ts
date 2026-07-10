import type { MetadataRoute } from "next";
import { getDictionary, locales } from "@/lib/i18n";

const SITE_URL = "https://mindpeacestories.com";
const pages = ["", "/about", "/the-wise-parent", "/parent-starter-kit", "/success-stories", "/blog", "/pricing", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/blog" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
      });
    }
    for (const post of getDictionary(locale).blog.posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }
  return entries;
}
