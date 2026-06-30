# CONTENT-FACT-01 Prep

## Purpose

Prepare the real business-content handoff without changing presentation code, motion, assets, CTA, or `/legacy`.

- Current RC lock tag: `v4-rc-preview-1`
- Current content state: product facts, product claims, speaker notes, CTA, and output samples remain placeholder or demo-only unless explicitly approved.
- Source collection worksheet: `docs/content-status.md`

This document defines what must be collected before real content replaces placeholders. It does not approve product claims or authorize public use.

## Content Status Rules

All content fields must use one of these states:

- `VERIFIED`: supported by official product, test, sales, or operational material.
- `APPROVED`: explicitly approved for customer-facing display.
- `PLACEHOLDER`: not yet confirmed; may remain in internal preview only.
- `DO_NOT_USE`: sensitive, inaccurate, blocked, or not allowed in the audience screen.

Rules:

- `DO_NOT_USE` content must never appear in review mode or customer-facing output.
- `PLACEHOLDER` content must not be styled as a verified fact.
- `VERIFIED` does not automatically mean customer-facing; it still needs approval when the wording is public-facing.
- Unknown fields must stay as pending/placeholder instead of being completed by inference.

## Required Inputs

### Product Identity

- Brand.
- Formal product name.
- Model / SKU.
- Product series.
- Surface finish / color.
- Main sales market.
- Target customer.
- Permission to show publicly.

### Product Facts

Current code placeholders:

- `fact-thermostatic-water`: 恒温出水.
- `fact-anti-scald`: 防烫设计.
- `fact-silicone-nozzle`: 硅胶出水嘴.
- `fact-body-material`: 主体材质待确认.

Required confirmation for each fact:

- Exact product fact.
- Source material or owner.
- Public wording.
- Anchor id in ProductStage.
- Status.
- Whether it can be used in the main presentation.

### Product Claims And Customer Benefits

Current code placeholders:

- `claim-stable-temperature`: 减少水温忽冷忽热.
- `claim-safer-use`: 使用更安心.
- `claim-easier-cleaning`: 日常清洁更方便.
- `claim-material-confidence`: 材质表达待确认.

Required confirmation for each claim:

- Linked product fact id.
- Benefit wording.
- Applicable scene tags.
- Approval owner.
- Status.
- Risk notes if the wording could imply certification, warranty, performance, safety guarantee, or price value.

### Commercial And Risk-Sensitive Fields

These fields are blocked until explicitly confirmed:

- MOQ.
- Price.
- Lead time.
- Warranty.
- Certifications.
- Sample policy.
- OEM / ODM policy.
- Export markets.
- Availability.
- Any diagnostic score, seat count, event date, or signup promise.

If unknown, these fields must remain `PLACEHOLDER` or `DO_NOT_USE`.

### Business Output Samples

Prepare approved examples for:

- Social / Moments copy.
- Poster headline, subheadline, benefit tags, CTA.
- Sales follow-up script.
- 45-second video storyboard.
- English inquiry reply.
- FAQ / objection handling.
- Department output examples for market, sales, video, foreign trade, and customer service.

Each sample must include:

- Source fact ids.
- Content owner.
- Review status.
- Public-use status.
- Fields that still require human confirmation.

## Current Repo Mapping

Existing content entry points:

- `src/content/product-prototype.ts`: product identity, facts, claims, anchors.
- `src/content/safety-prototype.ts`: output cards, review state, scenario candidates, CTA placeholder copy.
- `src/content/cta.ts`: CTA status and label.
- `src/content/speaker-notes.ts`: speaker-note placeholders.
- `src/content/scenes.ts` and `src/content/beats.ts`: approved scene/beat structure and screen-copy spine.
- `docs/content-status.md`: product-data collection worksheet.

Do not duplicate these sources with a second content system. Future implementation should update the existing content modules or add a typed content data file that they consume.

## Allowed And Forbidden Changes For The Later Content Pass

Allowed in `CONTENT-FACT-01` implementation:

- Replace placeholder product facts with verified/approved facts.
- Add typed content records for product facts, claims, FAQ, samples, and review status.
- Update speaker notes and audience copy only with approved wording.
- Keep visible placeholders for fields that are not approved.
- Add tests that block `DO_NOT_USE` and unapproved commercial fields from review mode.

Forbidden in `CONTENT-FACT-01` implementation:

- Modify Runtime.
- Modify StageTarget.
- Modify `/legacy`.
- Change key transition structure.
- Add real product images.
- Generate QR codes or fake CTA links.
- Invent prices, MOQ, lead time, certifications, warranty, diagnostic scores, event dates, or availability.
- Hide missing content by removing the corresponding business step from the story.

## Handoff Template

Use this shape for each submitted fact or sample before implementation:

```text
id:
display text:
source material:
source owner:
approval owner:
status: VERIFIED / APPROVED / PLACEHOLDER / DO_NOT_USE
public display allowed: yes / no
linked product anchor:
linked beat or scene:
risk notes:
```

## Acceptance Checklist For Future Implementation

- All product facts have explicit status.
- All customer benefits link back to product facts.
- Commercial fields are either approved or visibly pending.
- `DO_NOT_USE` content is filtered from customer-facing output.
- CTA remains placeholder until a real link or QR is approved.
- No code path invents missing business information.
- `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` pass after implementation.

## Next Action For Human Team

Fill `docs/content-status.md` or provide an equivalent spreadsheet with owners and statuses. Implementation should not begin until the fields intended for customer display are at least `APPROVED`.
