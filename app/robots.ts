import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/api-test/"],
        },
        sitemap: "https://henheang.site/sitemap.xml",
    }
}
