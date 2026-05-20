const express = require('express');
const path = require('path');
const { createCanvas, registerFont } = require('canvas');

// Register Roboto fonts to guarantee perfect rendering on any platform (e.g. Linux / Railway)
registerFont(path.join(__dirname, 'assets/Roboto-Bold.ttf'), { family: 'RobotoBold' });
registerFont(path.join(__dirname, 'assets/Roboto-Regular.ttf'), { family: 'RobotoRegular' });

const app = express();
const PORT = process.env.PORT || 5050;

// Serve static files from the root and assets directories
app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ─────────────────────────────────────────────────────────────────────────────
// LIVE COUNTDOWN IMAGE ENDPOINT
// Usage: /countdown.png?deadline=2026-05-23T17:59:00
// Returns a dynamically generated PNG showing the CURRENT remaining time.
// Every time an email client fetches this image, it gets a fresh render.
// Light-mode design: white background, always readable on any device/theme.
// ─────────────────────────────────────────────────────────────────────────────
app.get('/countdown.png', (req, res) => {
  const deadlineStr = req.query.deadline || '';

  // Parse deadline safely (works on all platforms including Safari engine)
  let targetMs = 0;
  if (deadlineStr) {
    const parts = deadlineStr.split(/\D+/).map(Number);
    if (parts.length >= 3) {
      const [y, mo, d, h = 0, mi = 0, s = 0] = parts;
      const parsed = new Date(y, mo - 1, d, h, mi, s);
      if (!isNaN(parsed.getTime())) targetMs = parsed.getTime();
    }
  }

  // Calculate remaining time
  const now = Date.now();
  const diffMs = Math.max(0, targetMs - now);
  const totalSecs = Math.floor(diffMs / 1000);
  const days    = Math.floor(totalSecs / 86400);
  const hours   = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const pad = n => String(n).padStart(2, '0');
  const units = [
    { value: pad(days),    label: 'DAYS'  },
    { value: pad(hours),   label: 'HRS'   },
    { value: pad(minutes), label: 'MINS'  },
    { value: pad(seconds), label: 'SECS'  },
  ];

  // ── Canvas dimensions ──────────────────────────────────────────────────────
  // Scale 2x for retina sharpness
  const SCALE = 2;
  const W = 520;
  const H = 120;
  const canvas = createCanvas(W * SCALE, H * SCALE);
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  // ── Light background ───────────────────────────────────────────────────────
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Outer rounded container — light card
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(10, 8, W - 20, H - 16, 10);
  ctx.fill();
  ctx.stroke();

  // Gold left accent bar
  ctx.fillStyle = '#e08b00';
  ctx.beginPath();
  ctx.roundRect(10, 8, 4, H - 16, [10, 0, 0, 10]);
  ctx.fill();

  // ── Colours ────────────────────────────────────────────────────────────────
  const GOLD    = '#e08b00';
  const DARK    = '#0f172a';   // number text — very dark, always readable
  const MUTED   = '#64748b';   // label text

  // ── Box layout ─────────────────────────────────────────────────────────────
  const boxW  = 88;
  const boxH  = 72;
  const gap   = 10;
  const colonW = 18;
  const totalBlockW = units.length * boxW + (units.length - 1) * (gap + colonW);
  let x = (W - totalBlockW) / 2 + 4;  // +4 to account for left accent bar
  const boxY = (H - boxH) / 2;

  units.forEach((unit, i) => {
    // White box with subtle border
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    // Number — large, dark, bold
    ctx.fillStyle = DARK;
    ctx.font = '30px RobotoBold';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(unit.value, x + boxW / 2, boxY + boxH / 2 + 4);

    // Label — small, muted, below number
    ctx.fillStyle = MUTED;
    ctx.font = '11px RobotoRegular';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(unit.label, x + boxW / 2, boxY + boxH - 8);

    x += boxW;

    // Colon separator (skip after last)
    if (i < units.length - 1) {
      ctx.fillStyle = GOLD;
      ctx.font = '24px RobotoBold';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(':', x + colonW / 2, boxY + boxH / 2 + 4);
      x += colonW + gap;
    }
  });

  // ── Send PNG response ──────────────────────────────────────────────────────
  res.setHeader('Content-Type', 'image/png');
  // No-cache: every email open fetches a fresh image with current time
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  // Allow email clients to fetch across origins
  res.setHeader('Access-Control-Allow-Origin', '*');

  canvas.createPNGStream().pipe(res);
});

// Main route serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('\n\x1b[36m%s\x1b[0m', '=============================================================');
  console.log('\x1b[32m%s\x1b[0m', '  GCPC EMAIL TEMPLATE BUILDER & PREVIEWER STATUS: ACTIVE');
  console.log('\x1b[36m%s\x1b[0m', '=============================================================');
  console.log(`\n  Localhost server is running successfully!`);
  console.log(`  Access the interactive designer in your browser at:`);
  console.log(`  \x1b[33mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`\n  Live Countdown Image endpoint:`);
  console.log(`  \x1b[33mhttp://localhost:${PORT}/countdown.png?deadline=YYYY-MM-DDTHH:MM:SS\x1b[0m`);
  console.log(`\n  Use this dashboard to:`);
  console.log(`  1. Customize titles, details, rules, deadlines, and links.`);
  console.log(`  2. Real-time preview the email on desktop and mobile.`);
  console.log(`  3. Copy email-safe, inline-styled HTML to your clipboard.`);
  console.log(`  4. Download the production-ready email template file.`);
  console.log('\n\x1b[36m%s\x1b[0m', '=============================================================');
});
