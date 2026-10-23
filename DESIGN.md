---
name: Kiet profile
description: A GitHub profile README with monospace section labels under a pixel-art bowl of pho.
colors:
  ink: "#37352f"
  muted: "#67635b"
  faint: "#b7c0ca"
  rule: "#d8dee4"
  accent: "#994509"
  ink-dark: "#e6edf3"
  muted-dark: "#8b949e"
  faint-dark: "#4b5563"
  rule-dark: "#30363d"
  accent-dark: "#e09a55"
  page: "#ffffff"
  page-dark: "#0d1117"
  link: "#0969da"
  link-dark: "#4493f8"
typography:
  graphic:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "1.4px"
  stat:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  heading:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
spacing:
  graphic-width: "760px"
  section: "18px"
rounded:
  none: "0"
components:
  section-heading:
    textColor: "{colors.ink}"
    typography: "{typography.heading}"
    width: "{spacing.graphic-width}"
    height: "52px"
  hero:
    width: "{spacing.graphic-width}"
    height: "380px"
---

## Overview

The profile is a generated GitHub README. Graphics are SVG with an embedded subset of JetBrains Mono (SIL Open Font License, `assets/fonts/OFL.txt`). The page background stays transparent so GitHub's light or dark canvas shows through. `preview.html` is a local stand-in and is not part of the profile.

## Colors

Light ink is `#37352f`. The only chromatic color is rust `#994509`, used for the train, lit blocks, active days, and language fills. Hairlines are `#d8dee4`. Dark swaps every role; it does not invert the rust into a second hue family. The accent on dark is `#e09a55`.

## Typography

Every graphic uses the embedded mono face. The README's name and paragraphs are GitHub's own sans. The tagline and the focus line use `<samp>`. Section labels (`about`, `selected work`, `the build log`) are images, followed by a hairline at the x-height.

## Layout

The hero, name, tagline, and links are centered. Everything below is left aligned at the same 760px measure as the graphics. Selected work is five stacked blocks: name, optional role, one sentence, stack line. There is no card grid.

## Elevation & Depth

No shadows. Separation is a 1px hairline.

## Shapes

The hero is a 126 by 63 pixel-art bowl of pho at 6px per cell, drawn in `scripts/pho.mjs`: blue-banded bowl on a plate, broth, noodles, beef, chili, basil, chopsticks, a side of herbs and lime, and three steam wisps that rise and fade. One dark-brown outline runs through every object. Reduced motion shows the steam still.

## Components

Section headings, the hero, the activity field, and the language row are generated. Edit `data/profile.json` or `data/activity.json`, then run `npm run generate`. Do not hand-edit `README.md` or the SVGs.

## Do's and Don'ts

Do keep new facts tied to the résumé or a fresh GitHub snapshot. Do ship a light and a dark file for every graphic.

Don't add a badge wall, emoji, or a moon-over-water scene. Don't publish the phone number unless asked. Don't draw private repository names.
