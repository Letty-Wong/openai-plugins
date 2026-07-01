# PRODUCT-ASSET-01 Prep

## Purpose

Prepare the demo shower product asset handoff without changing runtime code, motion targets, visual routes, or `/legacy`.

- Locked code tag: `v4-rc-preview-1`
- Locked code commit: `8c27c961a1aa059746f484e590ca8362291895c8`
- Current ProductStage placeholder id: `shower-h1-placeholder`

This document is a contract for the later demo asset replacement pass. The product is fictional and exists to demonstrate how product information and simple photos can become posters, video scripts, sales materials, foreign-trade replies, FAQ, and department outputs. It does not approve real product claims, QR codes, CTA links, pricing, MOQ, certifications, lead times, or warranty details.

## Required Asset Package

Minimum files for a first demo-product pass:

- Transparent PNG main product image, or a clean simple product photo that can be masked.
- Product shadow image, optional if the main image already has usable grounding.
- Product mask image, recommended for clean layering.
- Warm-light demo product version.
- Neutral technical demo product version.
- Dark signal-red demo product version.
- Anchor data for product parts.

Preferred lighting variants:

- `silhouette`: dark readable outline for entry and fallback.
- `warm`: warm paper/product journey version.
- `neutral`: technical/source-check version.
- `red`: dark signal-red safety or finale accent version.

Required anchor ids:

- `productCenter`: overall product center.
- `valveCore`: thermostatic valve or control core.
- `railMid`: middle of the rail.
- `nozzleDetail`: nozzle/detail anchor.

Future anchor ids that must live in the asset manifest, not in motion targets:

- `topShower`: top shower center.
- `handShower`: hand shower center.
- `baseConnection`: wall/base connection point.

All anchors must use normalized coordinates in the final registered product canvas:

```json
{
  "productCenter": [0.5, 0.53],
  "valveCore": [0.5, 0.56],
  "railMid": [0.5, 0.36],
  "nozzleDetail": [0.44, 0.16],
  "topShower": [0.6, 0.1],
  "handShower": [0.42, 0.45],
  "baseConnection": [0.5, 0.86]
}
```

These values are examples only. Final values must be measured from the approved demo assets.

## File Naming And Placement

Future asset root:

```text
/public/assets/product/shower/
```

Future data root:

```text
/public/assets/product/shower/data/
```

Recommended filenames:

```text
shower-h1-main-transparent.png
shower-h1-shadow.png
shower-h1-mask.png
shower-h1-silhouette.png
shower-h1-warm.png
shower-h1-neutral.png
shower-h1-red.png
data/product-anchors.json
data/asset-manifest.json
```

Every bitmap must have explicit width, height, source status, and approval status in `asset-manifest.json`.

Do not place demo product assets in ad hoc folders, remote URLs, design scratch folders, or review evidence directories.

## Current ProductStage Contract

The current V4 stage renders the product through the same `ProductStage` body inside `actor.product-stage`.

Required identity to preserve:

- Component body: `ProductStage`
- Actor id: `actor.product-stage`
- Product id: `data-product-id="shower-h1-placeholder"`
- Shell selector: `.product-stage-shell`
- Render state attribute: `data-render-state`
- Current render states: `silhouette`, `warm`, `neutral`
- Current variants: `product`, `technical`, `safety`, `route-anchor`, `finale`

Current stable anchors:

- `.product-anchor.product-center` with `data-anchor-id="productCenter"`
- `.product-anchor.valve-core` with `data-anchor-id="valveCore"`
- `.product-anchor.rail-mid` with `data-anchor-id="railMid"`
- `.product-anchor.nozzle-detail` with `data-anchor-id="nozzleDetail"`

The later implementation may replace the internal placeholder line geometry with image layers, but it must keep the same wrapper, actor identity, anchor semantics, and product lifecycle.

## Allowed And Forbidden Changes For The Later Asset Pass

Allowed in `PRODUCT-ASSET-01` implementation:

- Change `ProductStage` internal rendering.
- Add a product asset manifest.
- Add product anchor data.
- Add product-only CSS for image layers, masks, and fallback states.
- Add local bitmap assets after the demo source and approval are confirmed.

Forbidden in `PRODUCT-ASSET-01` implementation:

- Modify `PoseTransitionRuntime`.
- Modify `stage-target.ts`.
- Modify `/legacy`.
- Rewrite the V4 transition plans.
- Create a second ProductStage or visually similar product actor.
- Change `actor.product-stage` identity.
- Move product alignment into per-beat CSS hacks.
- Replace local assets with remote image URLs.
- Use unapproved screenshots, random web images, or third-party product photos without permission.
- Present the fictional demo product as a real purchasable product.
- Invent product parameters, prices, MOQ, certifications, lead times, warranty, CTA links, or QR codes.

## Fallback Behavior

If approved demo product assets are missing, incomplete, or not aligned:

- Keep the current premium placeholder ProductStage.
- Keep content status as `PLACEHOLDER`.
- Keep asset-dependent product reveal and safety/finale product swaps blocked.
- Do not use a random real product photo as a temporary substitute.
- Do not hide missing assets with full-screen fades or new transition effects.

The fallback must still preserve `ProductStage` as the same DOM actor from `08.7` through Scene 21.

## Acceptance Checklist For Future Implementation

- `v4-rc-preview-1` remains a valid rollback point.
- Product remains one DOM actor: `actor.product-stage`.
- `ProductStage` keeps the same shell and anchor ids.
- Demo product image layers align to the same registered canvas.
- No Runtime, StageTarget, `/legacy`, or key transition structure changes.
- `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` pass.
- 1366 x 768 and 1920 x 1080 screenshots confirm the product does not jump across:
  - `08.7 -> 09.1`
  - `15.8 -> 16.1`
  - `20.10 -> 21.1`
