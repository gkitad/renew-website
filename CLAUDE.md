# Renew website: working rules

Read PRODUCT.md first. It holds the confirmed business facts and brand commitments.

## Always

- **Phone first.** Most visitors use a phone. Design, build and review every change at 375px wide first, then tablet, then desktop. Touch targets at least 44px, no horizontal scroll, the booking actions (text and DM) reachable within one thumb's reach of any page.
- **Use the Impeccable skill** (`.claude/skills/impeccable/`) for any UI design, redesign, critique or polish work. The site should have its own visual identity, not a generic AI look.
- **Brand:** white, black and gold only (gold sparingly); Montserrat; official logo in `public/brand/`. Interior Detail is always first and marked "Most popular".
- **Copy:** English, human and precise. Never use the em dash. Never invent business facts, prices, reviews, guarantees or results.

## Before pushing

```bash
npm run lint && npm run typecheck && npm test
npm run build && npm run test:e2e
```

Pushing to `main` on GitHub (gkitad/renew-website) deploys to Vercel automatically: https://renew-website-three.vercel.app
