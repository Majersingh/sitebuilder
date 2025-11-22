import { siteConfig } from "@/config/siteConfig";

/**
 * Returns animation props based on the configured animation level
 * @param lightProps - Props for 'light' animation level
 * @param mediumProps - Props for 'medium' animation level  
 * @param advancedProps - Props for 'advanced' animation level
 * @returns Animation props based on current animation level, or empty object if 'none'
 */
export function getAnimationProps<T extends Record<string, any>>(
    lightProps: T,
    mediumProps?: T,
    advancedProps?: T
): T | {} {
    const level = siteConfig.settings.animationLevel;

    if (level === "none") return {};
    if (level === "light") return lightProps;
    if (level === "medium") return mediumProps || lightProps;
    if (level === "advanced") return advancedProps || mediumProps || lightProps;

    return {};
}

/**
 * Returns className based on animation level
 */
export function getAnimationClass(
    lightClass: string,
    mediumClass?: string,
    advancedClass?: string
): string {
    const level = siteConfig.settings.animationLevel;

    if (level === "none") return "";
    if (level === "light") return lightClass;
    if (level === "medium") return mediumClass || lightClass;
    if (level === "advanced") return advancedClass || mediumClass || lightClass;

    return "";
}

/**
 * Check if animations are enabled
 */
export function hasAnimations(): boolean {
    return siteConfig.settings.animationLevel !== "none";
}
