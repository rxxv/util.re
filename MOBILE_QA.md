# Mobile QA Checklist

Use this list to verify the mobile experience (iPhone Safari + Android Chrome).

## Layout + overflow
- No horizontal scroll on `/` and tool pages.
- Hero, cards, and grids fit within viewport width.
- Long strings wrap (URLs, JSON output, IDs).

## Typography + spacing
- Headings scale well (no awkward wraps).
- Body text is readable; line height feels comfortable.
- Inputs do not trigger iOS zoom (font size >= 16px).

## Navigation
- Menu button is easy to tap (>= 44px).
- Drawer opens/closes smoothly and doesn’t shift layout.
- Drawer content scrolls independently and respects safe areas.

## Tool pages
- Tool UI stacks in one column on mobile.
- Buttons and copy actions don’t overlap.
- FAQ accordion and Related tools look clean and tappable.

## Forms + controls
- Inputs/textarea/select fill width.
- Buttons are full width or comfortably spaced.
- Focus rings visible and not clipped.

## Performance + polish
- No layout shifts from images.
- Dark theme contrast looks consistent.
- Animations are minimal and don’t block interaction.
