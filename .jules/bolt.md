## 2024-05-22 - Next.js Image Optimization
**Learning:** Next.js `next/image` component requires explicit domain configuration in `next.config.ts` for external images (like Unsplash). Without this, the optimization fails or the image doesn't load. Also, ensure to use `fill` and `sizes` for responsive background images.
**Action:** Always check `next.config.ts` when adding external images with `next/image`.
