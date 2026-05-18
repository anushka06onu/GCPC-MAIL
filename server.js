const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5050;

// Serve static files from the root and assets directories
app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
  console.log(`\n  Use this dashboard to:`);
  console.log(`  1. Customize titles, details, rules, deadlines, and links.`);
  console.log(`  2. Real-time preview the email on desktop and mobile.`);
  console.log(`  3. Copy email-safe, inline-styled HTML to your clipboard.`);
  console.log(`  4. Download the production-ready email template file.`);
  console.log('\n\x1b[36m%s\x1b[0m', '=============================================================');
});
