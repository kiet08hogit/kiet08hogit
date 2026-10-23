const W = 126;
const H = 63;
const P = 6;
const OX = (760 - W * P) / 2;
const OY = (380 - H * P) / 2;

const OUTLINE = '#3b2417';

const inEllipse = (x, y, cx, cy, rx, ry) => ((x - cx) / (rx + 0.4)) ** 2 + ((y - cy) / (ry + 0.4)) ** 2 <= 1;
const hash = (x, y) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

function segmentDistance(x, y, x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy)));
  return { d: Math.hypot(x - (x0 + dx * t), y - (y0 + dy * t)), t, side: (x - x0) * dy - (y - y0) * dx };
}

function createCanvas() {
  const grid = Array.from({ length: H }, () => Array(W).fill(null));
  function paint(test, color, outline) {
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        if (!test(x, y)) continue;
        const edge = outline && (!test(x - 1, y) || !test(x + 1, y) || !test(x, y - 1) || !test(x, y + 1));
        const fill = edge ? outline : typeof color === 'function' ? color(x, y) : color;
        if (fill) grid[y][x] = fill;
      }
    }
  }
  return { grid, paint };
}

function drawPho() {
  const { grid, paint } = createCanvas();
  const bowl = { cx: 66, cy: 27, rx: 40, ry: 11 };
  const front = (x) => bowl.cy + bowl.ry * Math.sqrt(Math.max(0, 1 - ((x - bowl.cx) / bowl.rx) ** 2));

  paint((x, y) => inEllipse(x, y, 66, 52, 50, 8), (x, y) => (y > 53 ? '#d9c6a5' : '#efe2cb'), '#8a6a4a');
  paint((x, y) => inEllipse(x, y, 66, 51, 40, 5), '#e3d3b6');

  const bodyHalf = (y) => {
    const t = (y - bowl.cy) / 22;
    return bowl.rx * (1 - 0.48 * t * t);
  };
  const inBody = (x, y) => y >= bowl.cy && y <= 49 && Math.abs(x - bowl.cx) <= bodyHalf(y);
  paint((x, y) => y >= 47 && y <= 51 && Math.abs(x - bowl.cx) <= 19, '#d8ccb8', OUTLINE);
  paint(inBody, (x, y) => {
    const dx = x - bowl.cx;
    const half = bodyHalf(y);
    const below = y - front(x);
    if (below >= 2 && below < 3) return '#2f5d9e';
    if (below >= 4 && below < 5) return '#2f5d9e';
    if (dx > half * 0.55) return '#e2d7c6';
    if (dx < -half * 0.62) return '#ffffff';
    return '#f7f1e6';
  }, OUTLINE);

  paint((x, y) => inEllipse(x, y, bowl.cx, bowl.cy, bowl.rx, bowl.ry), '#fbf7ef', OUTLINE);
  paint((x, y) => inEllipse(x, y, bowl.cx, bowl.cy, 36.5, 9.2), (x, y) => (y < bowl.cy ? '#e4d8c5' : '#efe6d8'), '#c9b89c');

  const broth = { cx: 66, cy: 28.5, rx: 34, ry: 7.6 };
  paint((x, y) => inEllipse(x, y, broth.cx, broth.cy, broth.rx, broth.ry), (x, y) => {
    const wave = Math.sin(x * 0.42 + Math.sin(y * 1.1 + x * 0.05) * 2.4);
    if (Math.abs(wave) < 0.22 && x < 86) return y % 2 === 0 ? '#f8eed8' : '#e9d6ae';
    if (y < broth.cy - 4) return '#a8641f';
    return hash(x, y) > 0.9 ? '#d99a48' : '#c47f31';
  }, '#8f531c');

  const slices = [
    [84, 25, 10, 3.6],
    [90, 29, 9, 3.2],
    [80, 31, 9, 3],
  ];
  for (const [cx, cy, rx, ry] of slices) {
    paint((x, y) => inEllipse(x, y, cx, cy, rx, ry), (x, y) => {
      if (hash(x, y) > 0.86) return '#f9d3d6';
      return y > cy ? '#de8590' : '#ec9ea7';
    }, '#a9505c');
  }

  const ring = (cx, cy, rx, ry, color, outline) => {
    paint((x, y) => inEllipse(x, y, cx, cy, rx, ry) && !inEllipse(x, y, cx, cy, rx - 1.3, ry - 1), color, outline);
  };
  ring(52, 25, 4.5, 2.4, '#f6f0e1', '#cdb98f');
  ring(60, 31, 3.5, 2, '#f6f0e1', '#cdb98f');
  ring(72, 24, 3.2, 1.9, '#e03124', '#8e1510');
  ring(76, 28, 2.8, 1.7, '#e03124', '#8e1510');
  paint((x, y) => inEllipse(x, y, 72, 24, 1.2, 0.6), '#f6c445');
  paint((x, y) => inEllipse(x, y, 76, 28, 1, 0.5), '#f6c445');

  for (let i = 0; i < 60; i += 1) {
    const x = Math.round(38 + hash(i, 3) * 54);
    const y = Math.round(22 + hash(i, 9) * 13);
    if (!inEllipse(x, y, broth.cx, broth.cy, broth.rx - 2, broth.ry - 1)) continue;
    const color = i % 3 === 0 ? '#2f8a35' : '#68bf5a';
    grid[y][x] = color;
    if (x + 1 < W) grid[y][x + 1] = color;
  }

  const leaf = (cx, cy, rx, ry) => paint((x, y) => inEllipse(x, y, cx, cy, rx, ry), (x, y) => (y < cy ? '#4f9e4c' : '#2e7a34'), '#1d4f22');
  leaf(44, 28, 5, 1.8);
  leaf(47, 31.5, 4.5, 1.6);
  paint((x, y) => y === 28 && x >= 41 && x <= 47, '#1d4f22');

  const chopstick = (x0, y0, x1, y1) => {
    const test = (x, y) => {
      const { d, t } = segmentDistance(x, y, x0, y0, x1, y1);
      return d <= 1 - t * 0.3;
    };
    paint(test, (x, y) => (segmentDistance(x, y, x0, y0, x1, y1).side < 0 ? '#c0834a' : '#6b3a1c'));
  };
  chopstick(28, 12, 102, 33);
  chopstick(33, 8, 107, 29);

  paint((x, y) => inEllipse(x, y, 17, 48, 14, 4), (x, y) => (y > 49 ? '#d9c6a5' : '#efe2cb'), '#8a6a4a');
  paint((x, y) => y >= 40 && y <= 47 && Math.abs(x - 17) <= 11 - 4 * ((y - 40) / 7) ** 2, (x, y) => (x > 21 ? '#e2d7c6' : '#f7f1e6'), OUTLINE);
  paint((x, y) => inEllipse(x, y, 17, 40, 11, 4), '#fbf7ef', OUTLINE);
  paint((x, y) => inEllipse(x, y, 17, 39.5, 9, 3), (x, y) => {
    const h = hash(x, y);
    if (h > 0.8) return '#f3ecd4';
    return h > 0.4 ? '#3d9440' : '#6cc15e';
  });
  const lime = (cx, cy) => {
    paint((x, y) => inEllipse(x, y, cx, cy, 3.4, 3.2) && y <= cy, (x, y) => (y === cy ? '#5d9e2c' : '#d8ef8a'), '#3f6e1d');
  };
  lime(12, 39);
  lime(21, 38);

  paint((x, y) => inEllipse(x, y, 108, 51, 4, 2) && y <= 51, (x, y) => (y === 51 ? '#5d9e2c' : '#d8ef8a'), '#3f6e1d');

  return grid;
}

function rects(grid) {
  const out = [];
  for (let y = 0; y < H; y += 1) {
    let x = 0;
    while (x < W) {
      const color = grid[y][x];
      if (!color) {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < W && grid[y][end] === color) end += 1;
      out.push(`<rect x="${OX + x * P}" y="${OY + y * P}" width="${(end - x) * P}" height="${P}" fill="${color}"/>`);
      x = end;
    }
  }
  return out.join('');
}

function steam(color) {
  const wisps = [52, 66, 80].map((baseX, index) => {
    const cells = [];
    for (let y = 2; y <= 13; y += 1) {
      const x = Math.round(baseX + Math.sin(y * 0.7 + index) * 1.6);
      cells.push(`<rect x="${OX + x * P}" y="${OY + y * P}" width="${P}" height="${P}" fill="${color}"/>`);
    }
    const delay = (index * 1.1).toFixed(1);
    return `<g opacity="0">
  <animate attributeName="opacity" values="0;0.85;0" dur="3.3s" begin="${delay}s" repeatCount="indefinite"/>
  <animateTransform attributeName="transform" type="translate" values="0 6;0 -6" dur="3.3s" begin="${delay}s" repeatCount="indefinite"/>
  ${cells.join('')}
</g>`;
  });
  const still = [52, 66, 80].map((baseX, index) => {
    const cells = [];
    for (let y = 4; y <= 11; y += 1) {
      const x = Math.round(baseX + Math.sin(y * 0.7 + index) * 1.6);
      cells.push(`<rect x="${OX + x * P}" y="${OY + y * P}" width="${P}" height="${P}" fill="${color}" opacity="0.6"/>`);
    }
    return cells.join('');
  }).join('');
  return `<g class="motion">${wisps.join('\n')}</g><g class="poster">${still}</g>`;
}

export function phoArt(theme) {
  const steamColor = theme === 'dark' ? '#8b949e' : '#a8a097';
  return `<g shape-rendering="crispEdges">
${rects(drawPho())}
${steam(steamColor)}
</g>`;
}
