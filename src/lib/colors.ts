import { siteConfig } from "@/config/siteConfig";

/**
 * Utility functions to work with siteConfig colors
 */

/**
 * Lightens a hex color by a percentage
 */
function lightenColor(hex: string, percent: number): string {
    // Remove # if present
    hex = hex.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Lighten
    const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Darkens a hex color by a percentage
 */
function darkenColor(hex: string, percent: number): string {
    // Remove # if present
    hex = hex.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Darken
    const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));

    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Get a lighter version of the background color
 */
export function getLightBg(): string {
    return lightenColor(siteConfig.colors.background, 5);
}

/**
 * Get a very light version of the background color (for cards, etc.)
 */
export function getCardBg(): string {
    return lightenColor(siteConfig.colors.background, 10);
}

/**
 * Get a darker version of the background color
 */
export function getDarkBg(): string {
    return darkenColor(siteConfig.colors.background, 10);
}

/**
 * Get primary color with opacity
 */
export function getPrimaryWithOpacity(opacity: number): string {
    const hex = siteConfig.colors.primary.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Get secondary color with opacity
 */
export function getSecondaryWithOpacity(opacity: number): string {
    const hex = siteConfig.colors.secondary.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Get text color with opacity
 */
export function getTextWithOpacity(opacity: number): string {
    const hex = siteConfig.colors.text.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Check if background is dark (for determining text color)
 */
export function isDarkBackground(): boolean {
    const hex = siteConfig.colors.background.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
}

/**
 * Get contrasting text color based on background
 */
export function getContrastText(): string {
    return isDarkBackground() ? '#ffffff' : '#000000';
}
