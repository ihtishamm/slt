import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Generated robots.txt. Mirrors the previous static file. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blogs/wp-admin/admin-ajax.php"],
        disallow: ["/blogs/wp-admin/", "/blogs/wp-includes/"],
      },
    ],
    sitemap: [
      `${site.url}/sitemap.xml`,
      // the WordPress blog publishes its own
      `${site.url}/blogs/sitemap_index.xml`,
    ],
  };
}
