## 2024-05-22 - Next.js Image Optimization
**Learning:** Next.js `next/image` component requires explicit domain configuration in `next.config.ts` for external images (like Unsplash). Without this, the optimization fails or the image doesn't load. Also, ensure to use `fill` and `sizes` for responsive background images.
**Action:** Always check `next.config.ts` when adding external images with `next/image`.

## 2026-01-30 - Next.js Image Optimization in Lists
**Learning:** When replacing `<img>` with `next/image` in a list with fixed-width containers, using `fill` combined with a specific `sizes` prop (e.g., `sizes="112px"`) ensures optimal image loading without layout shift.
**Action:** Use `fill` and specific `sizes` for images in horizontal scroll lists or fixed-size containers.
