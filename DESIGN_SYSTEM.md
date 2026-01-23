# Design System

This site uses a lightweight token system defined in `src/app/globals.css`.

## Tokens

### Colors
- `--bg`: app background
- `--surface`: primary card surface
- `--surface-2` / `--surface2`: secondary surface
- `--border`: subtle borders
- `--text`: primary text
- `--muted`: secondary text
- `--accent`: primary CTA color

### Radius
- `--radius-sm`, `--radius-md`, `--radius-lg`
- Aliases: `--r-sm`, `--r-md`, `--r-lg`, `--r-xl`

### Shadows
- `--shadow-sm`, `--shadow-md`, `--shadow-glow`

### Spacing (8pt scale)
- `--space-1` 4px
- `--space-2` 8px
- `--space-3` 12px
- `--space-4` 16px
- `--space-5` 24px
- `--space-6` 32px
- `--space-7` 48px

### Typography
Use `clamp()` for hero and page headings to keep mobile readable.

## Core Components

- `Container` (`src/components/ui/Container.tsx`): max width + horizontal padding
- `Section` (`src/components/ui/Section.tsx`): vertical spacing
- `Card` (`src/components/ui/Card.tsx`): primary surface
- `Surface` (`src/components/ui/Surface.tsx`): secondary surface
- `Button` (`src/components/ui/Button.tsx`): shared button styles
- `ButtonPrimary` / `ButtonSecondary` (optional)
- `Badge` (`src/components/ui/Badge.tsx`): small status chips
- `AuroraBackground` (`src/components/ui/AuroraBackground.tsx`)
- `ToolHeader` / `ToolShellLayout` / `StepsList` / `FAQAccordion`

## Usage Notes

- Keep inputs at `text-base` for iOS (prevents auto-zoom).
- Use `break-words` or `overflow-x-auto` for long output strings.
- Mobile-first layout: one column by default, add columns at `sm`/`lg`.
