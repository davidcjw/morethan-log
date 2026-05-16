# Mobile Accordion for Guides & Tags Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize mobile feed experience by making Guides and Tags collapsible accordions, hidden by default.

**Architecture:** Feed component manages accordion state and passes it to GuideList and TagList components. Each component renders differently on mobile (accordion) vs desktop (full list). Uses emotion styled-components for responsive styling.

**Tech Stack:** React hooks (useState), emotion/styled-components, react-icons (FiChevronDown)

---

## File Structure

**Modify:**
- `src/routes/Feed/index.tsx` - Add accordion state
- `src/routes/Feed/GuideList.tsx` - Add accordion UI and conditional rendering
- `src/routes/Feed/TagList.tsx` - Add accordion UI and conditional rendering

---

## Task 1: Add Accordion State to Feed Component

**Files:**
- Modify: `src/routes/Feed/index.tsx:22-45`

- [ ] **Step 1: Add state variables**

Update the Feed component to include accordion state. Find the line `const [q, setQ] = useState("")` and add below it:

```typescript
const [guideExpanded, setGuideExpanded] = useState(false)
const [tagExpanded, setTagExpanded] = useState(false)
```

The component should now look like:
```typescript
const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")
  const [guideExpanded, setGuideExpanded] = useState(false)
  const [tagExpanded, setTagExpanded] = useState(false)

  return (
    // ...
  )
}
```

- [ ] **Step 2: Pass props to GuideList in mobile-index**

Find the `.mobile-index` section (around line 42-45). Update the GuideList component to pass the accordion state:

```typescript
<div className="mobile-index">
  <GuideList 
    isExpanded={guideExpanded}
    onToggle={() => setGuideExpanded(!guideExpanded)}
  />
  <TagList 
    isExpanded={tagExpanded}
    onToggle={() => setTagExpanded(!tagExpanded)}
  />
</div>
```

- [ ] **Step 3: Verify no console errors**

Save the file. The page should still load without errors (components haven't been updated yet to accept these props, but TypeScript will warn—that's okay for now).

- [ ] **Step 4: Commit**

```bash
git add src/routes/Feed/index.tsx
git commit -m "feat: add accordion state to Feed component"
```

---

## Task 2: Update GuideList for Accordion Behavior

**Files:**
- Modify: `src/routes/Feed/GuideList.tsx`

- [ ] **Step 1: Add props interface**

At the top of the component, update the Props interface to include optional accordion props:

```typescript
type Props = {
  isExpanded?: boolean
  onToggle?: () => void
}
```

- [ ] **Step 2: Update component to use props**

Update the GuideList component signature and add toggle logic:

```typescript
const GuideList: React.FC<Props> = ({ isExpanded = false, onToggle }) => {
  const router = useRouter()
  const currentPath = router.asPath.split("?")[0]

  return (
    <StyledWrapper>
      <div 
        className="top"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle?.()
          }
        }}
      >
        <Emoji>📚</Emoji> Guides
        <ChevronIcon isExpanded={isExpanded} />
      </div>
      {isExpanded && (
        <div className="list">
          {HUB_LIST.map((hub) => {
            const href = `/${hub.slug}`
            return (
              <Link key={hub.slug} href={href} data-active={href === currentPath}>
                {hub.title}
              </Link>
            )
          })}
        </div>
      )}
    </StyledWrapper>
  )
}
```

- [ ] **Step 3: Create chevron icon component**

Add this component at the bottom of the file, before StyledWrapper:

```typescript
const ChevronIcon: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => (
  <span
    css={{
      display: 'inline-block',
      marginLeft: '0.375rem',
      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 150ms ease-out',
    }}
  >
    <FiChevronDown size={16} aria-hidden="true" />
  </span>
)
```

- [ ] **Step 4: Add import for FiChevronDown**

At the top of the file, add:

```typescript
import { FiChevronDown } from "react-icons/fi"
```

- [ ] **Step 5: Update StyledWrapper for mobile accordion**

Replace the StyledWrapper styled.div with:

```typescript
const StyledWrapper = styled.div`
  .top {
    margin-bottom: 0.625rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    @media (min-width: 1024px) {
      cursor: default;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    gap: 0.5rem;
    overflow: visible;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    @media (min-width: 1024px) {
      display: grid;
      gap: 0.375rem;
    }

    a {
      display: block;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      padding: 0.5rem 0.625rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray11};
      cursor: pointer;
      min-width: 0;

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
        border-color: ${({ theme }) => theme.colors.gray7};
        background-color: ${({ theme }) => theme.colors.gray3};
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.blue11};
        border-color: ${({ theme }) => theme.colors.blue7};
        background-color: ${({ theme }) => theme.colors.blue4};

        :hover {
          background-color: ${({ theme }) => theme.colors.blue4};
        }
      }
    }
  }
`
```

- [ ] **Step 6: Verify mobile appearance**

Open browser DevTools, set viewport to mobile (375px width). The "Guides" header should be clickable, show a chevron that rotates when clicked, and the list should expand/collapse. On desktop (1024px+), the list should always be visible and chevron hidden.

- [ ] **Step 7: Commit**

```bash
git add src/routes/Feed/GuideList.tsx
git commit -m "feat: add accordion behavior to GuideList on mobile"
```

---

## Task 3: Update TagList for Accordion Behavior

**Files:**
- Modify: `src/routes/Feed/TagList.tsx`

- [ ] **Step 1: Add props interface**

Update the Props type to include accordion props:

```typescript
type Props = {
  isExpanded?: boolean
  onToggle?: () => void
}
```

- [ ] **Step 2: Update component to use props**

Update the TagList component signature to accept and use props:

```typescript
const TagList: React.FC<Props> = ({ isExpanded = false, onToggle }) => {
  const router = useRouter()
  const currentTag =
    typeof router.query.tag === "string" ? router.query.tag : undefined
  const data = useTagsQuery()
  const [expanded, setExpanded] = useState(false)
  // ... rest of the component logic stays the same until return

  return (
    <StyledWrapper>
      <div
        className="top"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle?.()
          }
        }}
      >
        <Emoji>🏷️</Emoji> Tags
        <ChevronIcon isExpanded={isExpanded} />
      </div>
      {isExpanded && (
        <div className="list">
          {visibleTags.map(([key, count]) => (
            <a
              key={key}
              data-active={key === currentTag}
              onClick={() => handleClickTag(key)}
            >
              <span>{key}</span>
              <span className="count">{count}</span>
            </a>
          ))}
          {hasMoreTags && (
            <button type="button" onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show fewer" : `Show ${hiddenTagCount} more`}
            </button>
          )}
        </div>
      )}
    </StyledWrapper>
  )
}
```

- [ ] **Step 3: Create chevron icon component**

Add this before StyledWrapper (same as GuideList):

```typescript
const ChevronIcon: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => (
  <span
    css={{
      display: 'inline-block',
      marginLeft: '0.375rem',
      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 150ms ease-out',
    }}
  >
    <FiChevronDown size={16} aria-hidden="true" />
  </span>
)
```

- [ ] **Step 4: Add import for FiChevronDown**

At the top, add:

```typescript
import { FiChevronDown } from "react-icons/fi"
```

- [ ] **Step 5: Update StyledWrapper styling**

Replace the StyledWrapper styled.div with:

```typescript
const StyledWrapper = styled.div`
  .top {
    margin-bottom: 0.625rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    @media (min-width: 1024px) {
      cursor: default;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    gap: 0.5rem;
    overflow: visible;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    @media (min-width: 1024px) {
      display: grid;
      gap: 0.375rem;
    }

    a,
    button {
      display: flex;
      gap: 0.375rem;
      align-items: center;
      justify-content: space-between;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      padding: 0.5rem 0.625rem;
      background-color: transparent;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray11};
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      min-width: 0;

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
        border-color: ${({ theme }) => theme.colors.gray7};
        background-color: ${({ theme }) => theme.colors.gray3};
      }
      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.blue11};
        border-color: ${({ theme }) => theme.colors.blue7};
        background-color: ${({ theme }) => theme.colors.blue4};

        :hover {
          background-color: ${({ theme }) => theme.colors.blue4};
        }
      }

      .count {
        color: ${({ theme }) => theme.colors.gray9};
        font-size: 0.75rem;
        line-height: 1rem;
        flex: 0 0 auto;
      }
    }

    button {
      color: ${({ theme }) => theme.colors.blue11};
      font-weight: 700;
    }
  }
`
```

- [ ] **Step 6: Verify mobile appearance**

Open DevTools, set to mobile viewport (375px). Tags header should be clickable with rotating chevron. List should expand/collapse. On desktop (1024px+), list always visible.

- [ ] **Step 7: Commit**

```bash
git add src/routes/Feed/TagList.tsx
git commit -m "feat: add accordion behavior to TagList on mobile"
```

---

## Task 4: Cross-Browser Testing

**Files:**
- Test: Manual testing in browser

- [ ] **Step 1: Test mobile (< 768px viewport)**

- Open the home page in DevTools mobile view (375px width)
- Verify: Guides accordion is closed by default, header is clickable
- Verify: Click Guides header → list expands, chevron rotates 90°
- Verify: Click Guides header again → list collapses, chevron returns to 0°
- Verify: Tags accordion same behavior independently
- Verify: Search input is fully visible and focused
- Verify: Post list is visible without excessive scrolling

- [ ] **Step 2: Test tablet (768px - 1023px)**

- Resize to 768px width
- Verify: Same accordion behavior as mobile

- [ ] **Step 3: Test desktop (1024px+)**

- Resize to 1024px and wider
- Verify: GuideList and TagList in `.mobile-index` are hidden (display: none via @media)
- Verify: `.lt` (left sidebar) shows full GuideList
- Verify: `.rt` (right sidebar) shows full TagList
- Verify: No accordions on desktop, full lists always visible

- [ ] **Step 4: Test keyboard accessibility**

- Mobile view (375px)
- Tab through the page
- Verify: Guides and Tags headers are reachable with Tab
- Verify: With focus on header, press Enter or Space to toggle accordion
- Verify: Focus management is sensible (doesn't jump unexpectedly)

- [ ] **Step 5: Test tag filtering with expanded state**

- Mobile view (375px)
- Expand Tags accordion
- Click a tag to filter posts
- Verify: Tag is highlighted, posts are filtered
- Verify: When you click "Show X more" button inside the list, it expands without closing the accordion

- [ ] **Step 6: Test state persistence**

- Mobile view (375px)
- Expand Guides accordion
- Expand Tags accordion
- Refresh the page (Cmd+R or F5)
- Verify: Both accordions reset to closed (no persistence expected—that's fine)

- [ ] **Step 7: No commits for this task**

All testing is manual verification. If issues are found, they'll be fixed in subsequent tasks or bugs.

---

## Task 5: Final Verification and Mobile Optimization Commit

**Files:**
- Modified: `src/routes/Feed/index.tsx`, `src/routes/Feed/GuideList.tsx`, `src/routes/Feed/TagList.tsx`

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000 (or similar)

- [ ] **Step 2: Open in browser**

Navigate to http://localhost:3000 on mobile viewport (375px).

Expected: 
- Guides and Tags are collapsed
- Search input is prominent
- Post list is immediately visible
- Accordions expand/collapse smoothly

- [ ] **Step 3: Check for TypeScript errors**

```bash
npm run type-check
```

Expected: No errors related to the changes.

- [ ] **Step 4: Verify git status**

```bash
git status
```

Expected: All changes are committed (clean working tree).

- [ ] **Step 5: Summary**

All tasks complete. Mobile feed now has collapsible Guides and Tags accordions, improving the mobile experience. Desktop behavior unchanged.

---

## Plan Summary

✅ Feed component state management  
✅ GuideList accordion implementation  
✅ TagList accordion implementation  
✅ Cross-browser testing  
✅ Final verification  

Mobile experience optimized with collapsible accordions, desktop unchanged.
