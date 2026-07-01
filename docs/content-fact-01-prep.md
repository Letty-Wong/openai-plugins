# CONTENT-FACT-01 Prep

## Purpose

Prepare the lecture-driven demo content handoff without changing presentation code, motion, assets, CTA, or `/legacy`.

- Current RC lock tag: `v4-rc-preview-1`
- Current content state: the shower product is a fictional demo product used to show the workflow from product information and simple photos to posters, video scripts, sales copy, foreign-trade replies, FAQ, and department materials.
- Source collection worksheet: `docs/content-status.md`
- Lecture source: `22-第一节课V3_讲师逐字稿.html`, section `4. 产品生成肌肉：一个卫浴产品如何变成一套业务素材`

This document defines what can be treated as approved demo material. It does not turn the fictional product into a real commercial product and does not approve prices, MOQ, certifications, warranty, real QR codes, or real signup links.

## Content Status Rules

All content fields must use one of these states:

- `VERIFIED`: supported by official product, test, sales, or operational material. For this fictional demo product, this should normally remain unused unless a real source is later provided.
- `APPROVED`: approved demo wording that may appear in the customer preview as fictional/example content.
- `PLACEHOLDER`: not yet confirmed; may remain in internal preview only.
- `DO_NOT_USE`: sensitive, inaccurate, blocked, or not allowed in the audience screen.

Rules:

- `DO_NOT_USE` content must never appear in review mode or customer-facing output.
- `PLACEHOLDER` content must not be styled as a verified fact.
- Demo product facts may be `APPROVED` when they come from the lecture script and are visibly used as an example.
- Unknown commercial fields must stay as pending/placeholder instead of being completed by inference.
- The audience should understand that the product is an example case, not a real product listing.

## Required Inputs

### Demo Product Identity

- Demo product name: `恒温淋浴花洒套装`.
- Product category: 卫浴五金产品.
- Demo purpose: show how one product information packet becomes sales, market, video, foreign-trade, and customer-service materials.
- Brand / model / SKU: keep as `PLACEHOLDER` unless the user intentionally creates fictional demo labels.
- Permission to show: approved as demo content only, not as a real product claim.

### Product Facts

Lecture-approved demo facts:

- `fact-thermostatic-water`: 恒温出水.
- `fact-anti-scald`: 防烫设计.
- `fact-silicone-nozzle`: 硅胶出水嘴.
- `fact-body-material`: 铜主体.
- Additional lecture fact: 节水.
- Additional lecture material: 不锈钢升降杆.

Required confirmation for each fact:

- Exact demo wording.
- Lecture source or human owner.
- Public wording.
- Anchor id in ProductStage.
- Status.
- Whether it is clearly treated as demo content in the main presentation.

### Product Claims And Customer Benefits

Lecture-approved customer benefits:

- `claim-stable-temperature`: 减少水温忽冷忽热.
- `claim-safer-use`: 老人小孩使用更安心.
- `claim-easier-cleaning`: 日常清洁更方便，减少堵塞.
- `claim-material-confidence`: 耐用、质感好.

Required confirmation for each claim:

- Linked product fact id.
- Benefit wording.
- Applicable scene tags.
- Approval owner.
- Status.
- Risk notes if the wording could imply certification, warranty, performance guarantee, medical/safety guarantee, or price value.

### Commercial And Risk-Sensitive Fields

These fields must remain pending in the demo unless the user explicitly supplies fictional demo values and wants them displayed as placeholders:

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

In the lecture, MOQ, warranty, price, and lead time are intentionally shown as fields that AI must not invent. They should remain `PLACEHOLDER` in the demo output.

### Business Output Samples

Prepare approved demo examples for:

- Social / Moments copy: `一套好花洒，不只是出水顺。恒温、防烫、易清洁，老人小孩用着更安心，酒店和家庭浴室都适合。`
- Poster headline: `稳定水温，让每一次淋浴更安心。`
- Sales follow-up script: families focus on 恒温 / 防烫; hotel projects focus on 易清洁 / maintenance cost.
- 45-second video storyboard:
  - 00-05s: pain hook, `洗澡最怕什么？不是水小，而是水温忽冷忽热。`
  - 05-15s: 恒温控制.
  - 15-25s: 老人小孩使用场景.
  - 25-35s: 硅胶出水嘴清洁.
  - 35-45s: 产品整体和安装场景，引导咨询.
- English inquiry reply: must include placeholders for MOQ, warranty, price, and lead time.
- FAQ / objection handling: water temperature, safety, nozzle blockage, installation, warranty.
- Department output examples: market, sales, video, foreign trade, customer service.

Each sample must include:

- Source fact ids or lecture section.
- Demo content owner.
- Review status.
- Demo-display status.
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

- Replace placeholder product facts with approved fictional demo facts from the lecture script.
- Add typed content records for product facts, claims, FAQ, samples, and review status.
- Update speaker notes and audience copy only with approved wording.
- Keep visible placeholders for commercial fields that the lecture intentionally leaves unconfirmed.
- Add tests that block `DO_NOT_USE` and unapproved commercial fields from review mode.

Forbidden in `CONTENT-FACT-01` implementation:

- Modify Runtime.
- Modify StageTarget.
- Modify `/legacy`.
- Change key transition structure.
- Add real product images.
- Generate QR codes or fake CTA links.
- Present fictional demo facts as real product facts.
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
demo display allowed: yes / no
linked product anchor:
linked beat or scene:
risk notes:
```

## Acceptance Checklist For Future Implementation

- All demo product facts have explicit status.
- All customer benefits link back to demo product facts.
- Commercial fields remain visibly pending unless deliberately approved as fictional placeholders.
- `DO_NOT_USE` content is filtered from customer-facing output.
- CTA remains placeholder until a real link or QR is approved.
- No code path invents missing business information.
- `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` pass after implementation.

## Next Action For Human Team

Use the lecture script section 4 as the first approved demo content source, then mark each displayed item in `docs/content-status.md` or an equivalent table. Implementation should not begin until the user confirms which lecture-derived demo facts and sample outputs are allowed on the customer preview screen.
