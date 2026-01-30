## 2024-10-26 - Semantic HTML for Interactive Lists
**Learning:** Using `<div>` with `onClick` for interactive lists (like service selection) excludes keyboard users and screen readers. Replacing it with `<button type="button" role="checkbox">` provides native keyboard support and semantic meaning without complex custom ARIA implementations.
**Action:** Always use `<button>` for list items that toggle state, adding `role="checkbox"` (for multi-select) or `aria-pressed` (for toggle) to clarify intent.

## 2024-10-27 - Semantic Navigation Labels
**Learning:** Icon-only buttons (like "Back") and active states in navigation bars are often invisible to screen readers, leaving users lost.
**Action:** Always add `aria-label` to icon-only buttons and `aria-current="page"` to the active navigation link.
