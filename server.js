const express = require('express');
const path = require('path');
const { createCanvas } = require('canvas');
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
// This is the only way to have a "live" countdown in email HTML.
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
  const W = 520;
  const H = 110;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // ── Background ─────────────────────────────────────────────────────────────
  // Dark card matching email countdown block
  ctx.fillStyle = '#0d1526';
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 12);
  ctx.fill();

  // ── Subtle border ──────────────────────────────────────────────────────────
  ctx.strokeStyle = '#e08b00';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(0.75, 0.75, W - 1.5, H - 1.5, 12);
  ctx.stroke();

  // ── Draw each time unit ────────────────────────────────────────────────────
  const GOLD  = '#e08b00';
  const WHITE = '#f1f5f9';
  const MUTED = '#94a3b8';

  const boxW  = 90;
  const boxH  = 60;
  const gap   = 18;         // gap between boxes
  const colonW = 20;
  const totalBlockW = units.length * boxW + (units.length - 1) * (gap + colonW);
  let x = (W - totalBlockW) / 2;
  const boxY  = (H - boxH) / 2;

  units.forEach((unit, i) => {
    // Box background
    ctx.fillStyle = '#0c1220';
    ctx.beginPath();
    ctx.roundRect(x, boxY, boxW, boxH, 6);
    ctx.fill();

    // Box border
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, boxY, boxW, boxH, 6);
    ctx.stroke();

    // Number
    ctx.fillStyle = GOLD;
    ctx.font = 'bold 26px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(unit.value, x + boxW / 2, boxY + boxH / 2 - 8);

    // Label
    ctx.fillStyle = MUTED;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(unit.label, x + boxW / 2, boxY + boxH - 16);

    x += boxW;

    // Colon separator (skip after last)
    if (i < units.length - 1) {
      ctx.fillStyle = GOLD;
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(':', x + colonW / 2, boxY + boxH / 2 - 8);
      x += colonW + gap;
    }
  });

  // ── Send PNG response ──────────────────────────────────────────────────────
  res.setHeader('Content-Type', 'image/png');
  // No-cache: every email open fetches a fresh image
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

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
