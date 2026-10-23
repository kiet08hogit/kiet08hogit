import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { phoArt } from './pho.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const fontFace = `data:font/ttf;base64,${(await readFile(path.join(root, 'assets/fonts/ProfileMono.ttf'))).toString('base64')}`;

const profile = JSON.parse(await read('data/profile.json'));

const light = { ink: '#37352f', rule: '#d8dee4' };
const dark = { ink: '#e6edf3', rule: '#30363d' };

const xml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
}[ch]));

const md = (value) => String(value).replace(/[\\`*_{}\[\]()#+\-.!|]/g, (ch) => `\\${ch}`);

function svgShell(width, height, title, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title">
<title id="title">${xml(title)}</title>
<style>@font-face{font-family:JB;src:url("${fontFace}") format("truetype");font-weight:400;font-style:normal}text{font-family:JB,monospace;font-variant-ligatures:none}.poster{display:none}@media(prefers-reduced-motion:reduce){.motion{display:none}.poster{display:inline}}</style>
${body}
</svg>
`;
}

function phoGraphic(theme) {
  return svgShell(760, 380, profile.heroAlt, phoArt(theme));
}

function headingGraphic(label, theme) {
  const palette = theme === 'dark' ? dark : light;
  const size = 16;
  const textWidth = label.length * size * 0.6;
  const lineX = Math.round(textWidth + 22);
  return svgShell(760, 52, label, `
<text x="0" y="32" fill="${palette.ink}" font-size="${size}">${xml(label)}</text>
<line x1="${lineX}" y1="25" x2="760" y2="25" stroke="${palette.rule}" stroke-width="1"/>`);
}

const themes = ['light', 'dark'];
await mkdir(path.join(root, 'assets'), { recursive: true });

const files = [];
for (const theme of themes) {
  files.push([`assets/pho-${theme}.svg`, phoGraphic(theme)]);
  files.push([`assets/heading-about-${theme}.svg`, headingGraphic('about', theme)]);
  files.push([`assets/heading-work-${theme}.svg`, headingGraphic('selected work', theme)]);
}

function picture(lightName, darkName, alt) {
  return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/${darkName}">
  <img src="./assets/${lightName}" width="760" alt="${xml(alt)}">
</picture>`;
}

const links = profile.links.map((link) => `[${link.label}](${link.url})`).join(' &nbsp; / &nbsp; ');
const quote = profile.quote.map((line) => `> ${md(line)}`).join('<br>\n');
const bio = profile.bio.map((line) => md(line)).join('\n\n');
const projects = profile.projects.map((project) => {
  const name = project.url ? `**[${project.name}](${project.url})**` : `**${project.name}**`;
  const award = project.award ? ` · ${md(project.award)}` : '';
  return `${name}${award}<br>\n${md(project.description)}`;
}).join('\n\n');
const techBlock = '```text\n' + profile.tech.join('\n') + '\n```';

const readme = `<!-- Generated from data/profile.json by npm run generate. -->
<div align="center">

<a href="${profile.links[0].url}" aria-label="Visit ${profile.fullName}'s site">
${picture('pho-light.svg', 'pho-dark.svg', profile.heroAlt)}
</a>

# ${profile.name}

<samp>${profile.tagline}</samp>

${links}

</div>

${picture('heading-about-light.svg', 'heading-about-dark.svg', 'about')}

${quote}

${bio}

${picture('heading-work-light.svg', 'heading-work-dark.svg', 'selected work')}

${projects}

## tech

${techBlock}
`;

function previewImage(lightName, darkName, alt) {
  return `<img class="for-light" src="./assets/${lightName}" width="760" alt="${xml(alt)}"><img class="for-dark" src="./assets/${darkName}" width="760" alt="">`;
}

const previewProjects = profile.projects.map((project) => {
  const name = project.url ? `<a href="${project.url}"><strong>${xml(project.name)}</strong></a>` : `<strong>${xml(project.name)}</strong>`;
  const award = project.award ? ` · ${xml(project.award)}` : '';
  return `<p class="project">${name}${award}<br>${xml(project.description)}</p>`;
}).join('\n');

const preview = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${xml(profile.name)}</title>
<style>
  :root { color-scheme: light; --bg:#ffffff; --ink:#1f2328; --muted:#59636e; --link:#0969da; --rule:#d1d9e0; --quote:#d1d9e0; }
  body[data-theme="dark"] { color-scheme: dark; --bg:#0d1117; --ink:#e6edf3; --muted:#8b949e; --link:#4493f8; --rule:#30363d; --quote:#3d444d; }
  body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif; }
  main { max-width:820px; margin:0 auto; padding:32px 24px 80px; }
  .center { text-align:center; }
  img { max-width:100%; height:auto; }
  h1 { font-size:32px; font-weight:600; margin:8px 0 0; letter-spacing:-0.02em; }
  .tag { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; margin:8px 0 12px; }
  .links a { color:var(--link); text-decoration:none; }
  .links a:hover { text-decoration:underline; }
  .links { margin:0 0 28px; }
  blockquote { margin:16px 0; padding:0 1em; color:var(--muted); border-left:.25em solid var(--quote); }
  p { margin:12px 0; }
  .focus { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; margin:18px 0 8px; }
  .project { margin:0 0 18px; }
  h2 { font-size:1.25em; font-weight:600; margin:28px 0 12px; padding-bottom:.3em; border-bottom:1px solid var(--rule); }
  pre { margin:0; padding:16px; overflow:auto; font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace; background:#f6f8fa; border-radius:6px; }
  body[data-theme="dark"] pre { background:#161b22; }
  .for-dark { display:none; }
  body[data-theme="dark"] .for-light { display:none; }
  body[data-theme="dark"] .for-dark { display:inline; }
  button { position:fixed; top:12px; right:12px; font:12px ui-monospace,monospace; background:var(--bg); color:var(--ink); border:1px solid var(--rule); padding:6px 8px; }
</style>
</head>
<body>
<button type="button" id="theme">dark</button>
<main>
  <header class="center">
    <a href="${profile.links[0].url}">${previewImage('pho-light.svg', 'pho-dark.svg', profile.heroAlt)}</a>
    <h1>${xml(profile.name)}</h1>
    <p class="tag">${xml(profile.tagline)}</p>
    <p class="links">${profile.links.map((link) => `<a href="${link.url}">${xml(link.label)}</a>`).join(' &nbsp; / &nbsp; ')}</p>
  </header>
  ${previewImage('heading-about-light.svg', 'heading-about-dark.svg', 'about')}
  <blockquote>${profile.quote.map((line) => xml(line)).join('<br>')}</blockquote>
  ${profile.bio.map((line) => `<p>${xml(line)}</p>`).join('\n')}
  ${previewImage('heading-work-light.svg', 'heading-work-dark.svg', 'selected work')}
  ${previewProjects}
  <h2>tech</h2>
  <pre>${xml(profile.tech.join('\n'))}</pre>
</main>
<script>
  const body = document.body;
  const button = document.getElementById('theme');
  function apply(theme) {
    body.dataset.theme = theme;
    button.textContent = theme === 'dark' ? 'light' : 'dark';
  }
  apply(location.hash === '#dark' ? 'dark' : 'light');
  button.addEventListener('click', () => apply(body.dataset.theme === 'dark' ? 'light' : 'dark'));
</script>
</body>
</html>
`;

for (const [name, content] of files) await writeFile(path.join(root, name), content);
await writeFile(path.join(root, 'README.md'), readme);
await writeFile(path.join(root, 'preview.html'), preview);
console.log(`wrote README.md, preview.html, and ${files.length} svg assets`);
