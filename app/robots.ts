import type { MetadataRoute } from "next"
import { profileData } from "@/data/profile"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/"],
        },
        sitemap: `${profileData.portfolioUrl}/sitemap.xml`,
    }
}
