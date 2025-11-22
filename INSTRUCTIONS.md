# Next.js Configurable Website Template

This is a fully configurable website template built with Next.js, TypeScript, and Tailwind CSS.
Everything is controlled from a single configuration file: `src/config/siteConfig.ts`.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open [http://localhost:3000](http://localhost:3000)** to see the result.

## How to Configure

1.  Open `src/config/siteConfig.ts`.
2.  Modify the `siteConfig` object to change content, colors, and settings.
3.  The changes will reflect immediately.

### Changing the Theme

You can change the primary, secondary, background, and text colors in the `colors` object within `siteConfig`.
These colors are automatically applied to the entire site using CSS variables.

### Switching Templates

We have provided 4 example configurations in `src/config/examples/`:
-   `marketing.ts` (Default)
-   `software.ts`
-   `freelance.ts`
-   `realestate.ts`

To switch to a different template:
1.  Open the desired example file (e.g., `src/config/examples/software.ts`).
2.  Copy the entire content.
3.  Paste it into `src/config/siteConfig.ts`.
4.  Save the file.

## Folder Structure

-   `src/config/siteConfig.ts`: The main configuration file.
-   `src/types/config.ts`: TypeScript definitions for the config.
-   `src/components/`: UI components (Hero, Services, etc.) that read from the config.
-   `src/app/globals.css`: Tailwind setup with CSS variables.
-   `src/app/layout.tsx`: Injects the config colors into the app.

## Customization

-   **Icons**: We use `react-icons`. You can import any icon from `react-icons` in `siteConfig.ts` and use it in the `icon` field of services or features.
-   **Images**: You can use local paths (put images in `public/`) or external URLs.
-   **Components**: You can modify the components in `src/components/` if you need layout changes beyond what the config offers.
