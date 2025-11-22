import { SiteConfig } from "@/types/config";
import siteConfig from "./siteConfig";

// This function is SUPPOSED to be called only inside "use client" components
export function getSiteConfig(): SiteConfig {
    try {
        if (typeof window === "undefined") {
            // SSR → no preview mode
            return siteConfig;
        }

        const raw = localStorage.getItem("previewConfig");
        if (!raw) return siteConfig;

        const previewConfig = JSON.parse(raw);

        return {
            ...siteConfig,
            ...previewConfig,
        };
    } catch (error) {
        console.error("Invalid previewConfig JSON:", error);
        return siteConfig;
    }
}
