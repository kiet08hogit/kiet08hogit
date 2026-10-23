# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: GitHub-flavored markdown plus SVG assets. A profile README cannot run JavaScript, and that is the surface the request asked for. Inferred from the brief, not from an interview answer.

## Users

Someone opening the GitHub profile of Nguyen Tuan Kiet Ho (kiet08hogit): a recruiter, collaborator, or classmate deciding whether to read the portfolio or a repo. Inferred from the request to make a profile README.

## Product Purpose

A profile README that states who Kiet is and what he has shipped, using only the résumé (and public GitHub links that match it). Success is that a visitor can verify the page against the résumé and against the public GitHub profile.

## Positioning

The page uses the same reading order as Matthew Kim's profile README: a scene, a name, one line, links, about, selected work, then a contribution field drawn as characters. The scene is not his ocean.

## Operating Context

The rendered page is `README.md` in the local project. It becomes the GitHub profile only after it is committed to `kiet08hogit/kiet08hogit`. A local `preview.html` exists so the layout can be checked before that.

## Capabilities and Constraints

- Facts come from `Nguyen Tuan Kiet Ho Resume.pdf`. The portfolio and the current emoji README were used only to confirm links and the tagline he already published.
- Do not invent awards, employers, or metrics. The portfolio's extra MHacks measurements are not on the résumé and are not on this page.
- Phone number is omitted. Open decision: add it only if he asks.
- Hobbies from the portfolio (hiking, ayce, haircuts) are omitted. Open decision.
- Contribution totals are the authenticated GitHub calendar for 2025-10-19 through 2026-10-22. They can include private contributions the token can see. No private repository names are shown.
- Language bars are bytes in owned public non-fork repositories.

## Brand Commitments

The user pinned Matthew Kim's profile README as the craft reference, and asked for a different scene in place of that sunset-like ocean. Display name on the page is "kiet ho"; the full legal name appears in the about text.

## Evidence on Hand

- Résumé PDF: `/Users/hokiet.nguyen/Documents/swe gen/Nguyen Tuan Kiet Ho Resume.pdf`
- Public profile: https://github.com/kiet08hogit
- Portfolio: https://nguyentuankietho.netlify.app/
- LinkedIn: https://www.linkedin.com/in/ntkiet-ho
- Email: hokiet.nguyen08@gmail.com

## Product Principles

- Every number on the page appears on the résumé or in the GitHub snapshot.
- The work list follows the résumé, not every public repository.
- The scene is drawn type, quiet, and original.
- Light and dark are both first-class, because GitHub swaps them.

## Accessibility & Inclusion

Decorative graphics carry text alternatives. Section headings are real images with titles, and the work list remains readable with images unloaded.
