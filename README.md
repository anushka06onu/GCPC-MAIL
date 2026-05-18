# 📧 DIU GCPC Email Suite — Premium Workspace & Interactive Builder

> **Stunning, highly interactive, and production-grade HTML Email Builder and Live Previewer workspace designed exclusively for the DIU Girls' Computer Programming Club (DIU GCPC).**

Welcome to the ultimate professional utility designed for the **DIU Girls' Computer Programming Club (DIU GCPC)**. This dashboard lets club executives customize, preview, and export premium, responsive academic event invitation emails that render perfectly across all modern desktop, web, and mobile email clients (including Outlook, Apple Mail, and Gmail mobile apps).

---

## 🎨 Professional Brand Layout & Premium Assets

The entire visual style is anchored around **DIU GCPC's** official brand color palette and high-resolution marketing elements:
*   **GCPC Royal Blue:** `#0a307a`
*   **GCPC Warm Amber Gold:** `#e08b00`

### 1. 💊 Centered Top Brand Logo Pill Capsule
*   **Compact Dimensions:** Sized to exactly **`105px`** wide (`width="105"` / `max-width: 105px`) with tight cell padding to create a highly visual, clean, and professional appearance.
*   **Inversion Protection Capsule:** The logo is encased inside a centered, solid-white capsule pill:
    ```html
    <table border="0" cellpadding="0" cellspacing="0" class="white-capsule" style="background: linear-gradient(#ffffff, #ffffff) !important; background-color: #ffffff; border-radius: 6px; padding: 6px 16px;">
    ```
    This prevents transparent logos from fading into the dark background when systems/email clients invert colors. The transparent GCPC logo remains perfectly legible, clean, and beautifully framed.

### 2. ⚡ Custom Hero Flyer Banner & Smart Fallbacks
You can choose how the email header banner renders:
*   **Custom Flyer Image URL:** Paste any hosted image link (e.g., event banner, poster flyer) into the sidebar form. The compiler immediately replaces the default layout with a fully fluid, edge-to-edge image banner.
*   **Sleek Text-Gradient Fallback:** If left blank, the email auto-compiles to render a premium Royal Blue-to-Gold linear gradient header displaying your **Event Title** and **Motto/Theme Tagline** in high-contrast crisp typography.

### 3. ⏱️ Pre-Calculated Live Countdown Snapshots
Since standard email inbox Compose editors disable JavaScript for security, a dynamic countdown script in a static email would fail or render static placeholders. We solved this with a **dynamic copy-time pre-compiler**:
*   The moment you click **Copy Email HTML** or **Download HTML**, the compiler calculates the exact active gap between the current time and your selected deadline (`May 23, 2026 at 5:59 PM`).
*   It hardcodes these pre-calculated live digits (e.g., **`04` Days, `23` Hours, `38` Mins**) directly into the static HTML code.
*   **No Broken Placeholders:** Recipients see a pristine, live remaining time snapshot when opening their email, with the countdown container gracefully omitting itself if no registration deadline is supplied.

### 🌙 4. Native Light & Dark Mode Compatibility
Instead of forcing the entire email layout to remain solid white (which strains eyes and violates modern OS preferences), the template **fully supports native color-scheme inverting**:
*   **Backgrounds:** Page backdrops (`#f1f5f9`) and the central body card (`#ffffff`) adapt naturally to dark-mode screens.
*   **High-Contrast Text Classing:** Mapped to dedicated typography classes (`.text-slate`, `.text-muted`, `.text-gold`), primary paragraph texts automatically shift to comfortable, premium off-whites (`#f1f5f9`) in dark environments.
*   **Action Button Shifting Prevention:** Gmail aggressively shifts dark blue buttons to a clashing violet color. We mapped `.btn-facebook` explicitly in prefers-color-scheme media queries to official brand-blue (`#1877F2`), keeping it pristine and visually consistent!
*   **Golden Contact Hyperlinks:** Under dark-mode viewports, active contact email links are overridden to a bright, readable amber gold (`#fbbf24`), keeping them fully legible against dark rows.

### 5. 💼 Premium Footer & Swapped LinkedIn Badge
*   **Varsity Branding White Capsule:** Supportive logos (Daffodil International University and CSE Department) are hosted inside a high-contrast white rounded capsule. Their **exact, original brand colors (green, blue, and teal)** are completely preserved.
*   **Vibrant Social Icons (LinkedIn Swapped):** The five official networks are represented with custom high-contrast, colorful circular badges:
    *   🌐 **Website:** Custom GCPC Gold (`#e08b00`) — [GCPC Site](https://gcpc.daffodilvarsity.edu.bd/)
    *   📘 **Facebook Page:** Deep Blue (`#1877F2`) — [DIUGCPC](https://www.facebook.com/DIUGCPC)
    *   📸 **Instagram:** Vibrant Magenta (`#E1306C`) — [diu_gcpc](https://www.instagram.com/diu_gcpc)
    *   💼 **LinkedIn Swapped:** Professional Cyan-Blue (`#0077B5`) — [gcpc-diu](https://www.linkedin.com/company/gcpc-diu)
    *   📢 **Telegram Announcements:** Sky Blue (`#0088CC`) — [diugcpc](https://t.me/diugcpc)

---

## 🚀 How to Run Locally

You can launch this builder dashboard locally on your Mac with absolute ease:

### 1. Install Server Dependencies
Open your shell in the workspace directory and install the lightweight Node.js requirements:
```bash
npm install
```

### 2. Start the Development Server
Run the startup script:
```bash
npm start
```
*The terminal will bind to `localhost:5050` (or your secondary fallback port).*

### 3. Open the Dashboard Studio
Open your Google Chrome browser and navigate to:
```url
http://localhost:5050/
```
*The responsive drag-and-preview dashboard will render instantly, loaded with your pre-populated GCPC event information!*

---

## ✉️ The Chrome "Inspect Element" Email Send Guide

If you are using Google Chrome and **Gmail** to send these templates, use this simple inspect trick to inject the HTML without using external newsletter services:
1. Open the local dashboard, customize your bootcamp event details, and click **"Copy Email HTML"**.
2. Open **Gmail** in your browser, click **Compose**, and type a distinct placeholder in the email body (e.g., `[GCPC_RENDER_HTML]`).
3. Right-click the placeholder word `[GCPC_RENDER_HTML]` and select **Inspect** to open the developer pane.
4. Right-click the active `<div>` or `<span>` node containing your placeholder in the DOM tree, and choose **Edit as HTML**.
5. Select all placeholder text, paste your copied email template code, and close the DevTools pane.
6. *Presto!* The gorgeous, fully styled GCPC email renders immediately inside Gmail's Compose window, ready to be sent to your mailing list!

---

## 📁 Repository Structure

```
/Users/fatehahossainanushka/Documents/GCPC-MAIL/
├── index.html          # Dynamic Template Builder Studio (Inputs, Previewer, Compiler)
├── server.js           # Lightweight Express web server
├── package.json        # Startup script configurations & dependencies
├── README.md           # This premium workspace documentation file
└── assets/             # Raw local branding logo files
```

Developed with 💙 by **DIU Girls' Computer Programming Club**.