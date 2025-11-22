# Color System & Animation Levels Guide

## Overview

The template now supports **dynamic colors** and **configurable animation levels** through `siteConfig.ts`. All colors and animations are controlled from a single configuration file.

---

## Color System

### Configuration

Colors are defined in `src/config/siteConfig.ts`:

```typescript
colors: {
    primary: "#e98512ff",      // Main brand color
    secondary: "#21bdadff",    // Secondary brand color
    background: "#0f172a",     // Page background
    text: "#f8fafc",           // Text color
}
```

### How It Works

1. **CSS Variables**: Colors are set as CSS variables in `layout.tsx`
2. **Tailwind Integration**: Variables are mapped to Tailwind colors in `globals.css`
3. **Usage**: Components use `bg-primary`, `text-primary`, etc.

### Using Colors in Components

#### Tailwind Classes (Recommended)
```tsx
<div className="bg-primary text-white">
<div className="bg-secondary">
<div className="bg-background text-foreground">
<div className="border-primary">
```

#### Inline Styles (When Needed)
```tsx
<div style={{ backgroundColor: 'var(--primary)' }}>
<div style={{ color: 'var(--secondary)' }}>
```

### Available Tailwind Color Classes

- `bg-primary` / `text-primary` / `border-primary`
- `bg-secondary` / `text-secondary` / `border-secondary`
- `bg-background` / `text-background`
- `bg-foreground` / `text-foreground`

---

## Animation Levels

### Configuration

Set animation level in `src/config/siteConfig.ts`:

```typescript
settings: {
    animationLevel: "none" | "light" | "medium" | "advanced",
    // ...
}
```

### Animation Levels Explained

| Level | Description | Use Case |
|-------|-------------|----------|
| `none` | No animations | Accessibility, performance |
| `light` | Subtle fades and transitions | Professional, minimal |
| `medium` | Moderate animations | Balanced experience |
| `advanced` | Full animations with particles, parallax | Wow factor, modern |

### Using Animation Helpers

Import the animation utilities:

```tsx
import { getAnimationProps, hasAnimations } from "@/lib/animations";
```

#### Example: Conditional Framer Motion Props

```tsx
<motion.div
    {...getAnimationProps(
        // Light animation
        { initial: { opacity: 0 }, animate: { opacity: 1 } },
        // Medium animation
        { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
        // Advanced animation
        { initial: { opacity: 0, y: 50, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } }
    )}
>
    Content
</motion.div>
```

#### Example: Check If Animations Enabled

```tsx
{hasAnimations() && (
    <motion.div animate={{ y: [0, -10, 0] }}>
        Floating element
    </motion.div>
)}
```

---

## Component Color Guidelines

### ❌ DON'T: Hardcode Colors

```tsx
// Bad - hardcoded colors
<div className="bg-purple-900">
<div className="text-blue-500">
<div style={{ backgroundColor: '#7C3AED' }}>
```

### ✅ DO: Use Config Colors

```tsx
// Good - uses config colors
<div className="bg-primary">
<div className="text-secondary">
<div className="bg-background text-foreground">
```

### Gradient Backgrounds

For gradients, use CSS variables:

```tsx
<div className="bg-gradient-to-br from-primary to-secondary">
```

Or use the predefined gradient utilities in `globals.css`:

```tsx
<div className="gradient-primary">  // Purple gradient
<div className="gradient-accent">   // Blue gradient
<div className="gradient-warm">     // Pink/yellow gradient
```

---

## Examples

### Example 1: Button Component

```tsx
import { getAnimationProps } from "@/lib/animations";
import { motion } from "framer-motion";

export function Button({ children }: { children: React.ReactNode }) {
    return (
        <motion.button
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            {...getAnimationProps(
                { whileHover: { scale: 1.02 } },
                { whileHover: { scale: 1.05 } },
                { whileHover: { scale: 1.05, y: -2 } }
            )}
        >
            {children}
        </motion.button>
    );
}
```

### Example 2: Card with Conditional Animations

```tsx
import { hasAnimations, getAnimationProps } from "@/lib/animations";
import { motion } from "framer-motion";

export function Card() {
    const Component = hasAnimations() ? motion.div : 'div';
    
    return (
        <Component
            className="p-6 bg-background border-2 border-primary/20 rounded-xl"
            {...(hasAnimations() ? getAnimationProps(
                { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
                { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } },
                { initial: { opacity: 0, y: 30, scale: 0.95 }, whileInView: { opacity: 1, y: 0, scale: 1 } }
            ) : {})}
        >
            Card content
        </Component>
    );
}
```

---

## Testing Different Configurations

### Test Dark Theme
```typescript
colors: {
    primary: "#3B82F6",
    secondary: "#1E40AF",
    background: "#0f172a",  // Dark
    text: "#f8fafc",        // Light text
}
```

### Test Light Theme
```typescript
colors: {
    primary: "#7C3AED",
    secondary: "#5B21B6",
    background: "#ffffff",  // Light
    text: "#1f2937",        // Dark text
}
```

### Test Animation Levels

Change `animationLevel` in siteConfig:
- `"none"` - No animations
- `"light"` - Minimal animations
- `"medium"` - Balanced animations
- `"advanced"` - Full animations

---

## Migration Checklist

To update existing components:

- [ ] Replace hardcoded color classes with `bg-primary`, `bg-secondary`, etc.
- [ ] Replace hardcoded hex colors with CSS variables
- [ ] Wrap Framer Motion props with `getAnimationProps()`
- [ ] Add `hasAnimations()` checks for optional animations
- [ ] Test with different `animationLevel` settings
- [ ] Test with different color schemes

---

## Common Patterns

### Pattern 1: Section Background
```tsx
<section className="py-20 bg-background">
```

### Pattern 2: Card with Border
```tsx
<div className="p-6 bg-white border-2 border-primary/20 rounded-xl">
```

### Pattern 3: Gradient Text
```tsx
<h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
```

### Pattern 4: Hover Effect
```tsx
<button className="bg-primary hover:bg-secondary text-white transition-colors">
```

---

## Troubleshooting

### Colors Not Applying?

1. Check `layout.tsx` - CSS variables should be set in body style
2. Verify `siteConfig.ts` has valid hex colors
3. Clear browser cache and restart dev server

### Animations Not Working?

1. Check `animationLevel` in `siteConfig.ts`
2. Ensure you're using `getAnimationProps()` helper
3. Verify Framer Motion is installed

### Background Color Not Showing?

1. Ensure `layout.tsx` sets `backgroundColor` in body style
2. Check that sections don't override with hardcoded backgrounds
3. Use `bg-background` class instead of `bg-white` or `bg-gray-900`

---

## Best Practices

1. **Always use config colors** - Never hardcode colors
2. **Use animation helpers** - Respect user's animation preference
3. **Test all levels** - Verify your component works with all animation levels
4. **Semantic naming** - Use `primary` for main actions, `secondary` for alternatives
5. **Accessibility** - Ensure sufficient contrast between `background` and `text`

---

## Quick Reference

```tsx
// Import helpers
import { getAnimationProps, hasAnimations, getAnimationClass } from "@/lib/animations";
import { siteConfig } from "@/config/siteConfig";

// Use colors
className="bg-primary text-white"
className="bg-background text-foreground"
style={{ color: 'var(--primary)' }}

// Use animations
{...getAnimationProps(light, medium, advanced)}
{hasAnimations() && <AnimatedElement />}
```
