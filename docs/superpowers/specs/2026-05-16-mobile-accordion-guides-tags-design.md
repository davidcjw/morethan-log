# Mobile-Optimized Feed: Collapsible Guides & Tags Design

**Date:** 2026-05-16  
**Scope:** Mobile layout optimization for the home feed  
**Status:** Design approved

## Problem

On mobile, the `.feed-hero` section contains the title, description, search input, and full Guides/Tags lists. This creates excessive vertical scrolling before users reach the actual post feed, degrading the mobile experience.

## Solution Overview

Convert Guides and Tags to collapsible accordion sections on mobile, hidden by default. Users can expand them on-demand. Desktop behavior remains unchanged.

## Architecture

### State Management

The `Feed` component in `src/routes/Feed/index.tsx` will manage accordion state:
- `guideExpanded: boolean` - tracks if Guides accordion is open (default: false)
- `tagExpanded: boolean` - tracks if Tags accordion is open (default: false)
- `setGuideExpanded(value: boolean)` - toggle function
- `setTagExpanded(value: boolean)` - toggle function

### Component Props

**GuideList** (`src/routes/Feed/GuideList.tsx`):
- New optional props: `isExpanded?: boolean`, `onToggle?: () => void`
- When `isExpanded` is false: render header only with chevron icon
- When `isExpanded` is true: render full list as current behavior
- Only applies accordion behavior on mobile (@media max-width: 767px)
- Desktop (1024px+): always render full list, ignore accordion props

**TagList** (`src/routes/Feed/TagList.tsx`):
- Same props and behavior as GuideList
- Maintains current expanded state logic for "Show X more" button

### Feed Structure

Within `.feed-hero` section:
1. Eyebrow text ("Singapore smart home field notes")
2. Title (h1)
3. Description (p)
4. SearchInput
5. `.mobile-index` (new accordion sections):
   - GuideList with `isExpanded={guideExpanded}` `onToggle={() => setGuideExpanded(!guideExpanded)}`
   - TagList with `isExpanded={tagExpanded}` `onToggle={() => setTagExpanded(!tagExpanded)}`

Outside `.feed-hero`:
- FeedHeader
- PostList (now more immediately visible on mobile)

## Styling Details

### Mobile Accordion Header

When collapsed on mobile:
- `.top` section becomes interactive (clickable)
- Add cursor: pointer
- Add a chevron icon (rotate 0° when closed, 90° when open)
- Light hover state (slight background color change using theme colors)

Example icon: `<FiChevronDown>` from react-icons (or similar), rotated based on state.

### List Visibility

CSS implementation:
```css
/* Mobile - collapsed state */
@media (max-width: 767px) {
  .list {
    display: none;
  }
  
  .list[data-expanded="true"] {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .top {
    cursor: pointer;
    user-select: none;
    
    &:hover {
      /* light hover state */
    }
  }
  
  .chevron {
    transform: rotate(0deg);
    transition: transform 150ms ease-out;
    
    &[data-expanded="true"] {
      transform: rotate(90deg);
    }
  }
}

/* Desktop - always visible, no accordion */
@media (min-width: 1024px) {
  .list {
    display: grid; /* or flex, current behavior */
  }
  
  .top {
    cursor: default;
  }
  
  .chevron {
    display: none;
  }
}
```

### Spacing

- When `.list` is collapsed (display: none), its `margin-bottom: 1rem` is not applied
- When expanded, spacing is restored
- No erratic growth/shrinkage of `.feed-hero` section

## Behavior

**Mobile (max-width: 1023px):**
- Guides accordion: closed by default, expands/collapses on click
- Tags accordion: closed by default, expands/collapses on click
- Each accordion is independent—opening one doesn't close the other
- Search input always visible and focused
- Post list immediately follows the accordions

**Desktop (1024px+):**
- No change to current behavior
- Guides and Tags render in sidebars (`.lt` and `.rt`)
- Feed hero shows title, description, search; `.mobile-index` hidden
- Accordion props are accepted but ignored

## Testing

- Mobile (< 768px): Accordions start closed, click to expand, chevron rotates
- Tablet (768px - 1023px): Accordions behavior same as mobile
- Desktop (1024px+): No accordion rendering, full lists visible in sidebars
- State preservation: Expanding one accordion doesn't affect the other
- Keyboard: Accordion header is keyboard-accessible (can be tabbed to, space/enter to toggle)

## Implementation Order

1. Add state variables to Feed component
2. Update GuideList to accept and render accordion logic
3. Update TagList to accept and render accordion logic
4. Add chevron icon and styling
5. Test on mobile, tablet, desktop
6. Verify search input remains functional and prominent
